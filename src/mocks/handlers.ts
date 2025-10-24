import { http, HttpResponse } from 'msw';

let fakeJWT = "fake-jwt-token";

// Helper functions for localStorage persistence
const MSW_STORAGE_KEY = 'msw-mock-tasks';

const getTasksFromStorage = () => {
  try {
    const stored = localStorage.getItem(MSW_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [
      { id: 1, title: "Learn React", description: "Study hooks and components", status: "pending", createdAt: new Date().toISOString() },
      { id: 2, title: "Build Task Manager", description: "Create a full-stack task management app", status: "in-progress", createdAt: new Date().toISOString() },
      { id: 3, title: "Deploy to Vercel", description: "Deploy the application to production", status: "completed", createdAt: new Date().toISOString() },
    ];
  } catch {
    return [
      { id: 1, title: "Learn React", description: "Study hooks and components", status: "pending", createdAt: new Date().toISOString() },
      { id: 2, title: "Build Task Manager", description: "Create a full-stack task management app", status: "in-progress", createdAt: new Date().toISOString() },
      { id: 3, title: "Deploy to Vercel", description: "Deploy the application to production", status: "completed", createdAt: new Date().toISOString() },
    ];
  }
};

const saveTasksToStorage = (tasks: any[]) => {
  localStorage.setItem(MSW_STORAGE_KEY, JSON.stringify(tasks));
};

const clearTasksFromStorage = () => {
  localStorage.removeItem(MSW_STORAGE_KEY);
};

// Export helper functions for debugging (optional)
if (typeof window !== 'undefined') {
  (window as any).mswHelpers = {
    getTasksFromStorage,
    saveTasksToStorage,
    clearTasksFromStorage,
  };
}

export const handlers = [
  // Authentication endpoints
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json() as { username: string; password: string };
    
    if (username === "test" && password === "test123") {
      return HttpResponse.json({ token: fakeJWT, user: { username: "test", id: 1 } });
    }
    
    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),

  http.post('/api/logout', () => {
    return HttpResponse.json({ message: "Logged out successfully" });
  }),

  // Task endpoints
  http.get('/api/tasks', ({ request }) => {
    // Always get fresh data from localStorage
    const tasks = getTasksFromStorage();
    
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');
    
    let filteredTasks = tasks;
    
    if (status && status !== 'all') {
      filteredTasks = filteredTasks.filter((task: any) => task.status === status);
    }
    
    if (search) {
      filteredTasks = filteredTasks.filter((task: any) => 
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return HttpResponse.json(filteredTasks);
  }),

  http.post('/api/tasks', async ({ request }) => {
    // Get current tasks from localStorage
    const tasks = getTasksFromStorage();
    
    const newTask = await request.json() as any;
    const task = {
      id: Date.now(),
      ...newTask,
      createdAt: new Date().toISOString(),
    };
    
    // Add new task to the array
    const updatedTasks = [...tasks, task];
    
    // Save updated tasks to localStorage
    saveTasksToStorage(updatedTasks);
    
    return HttpResponse.json(task, { status: 201 });
  }),

  http.put('/api/tasks/:id', async ({ request, params }) => {
    // Get current tasks from localStorage
    const tasks = getTasksFromStorage();
    
    const { id } = params;
    const updated = await request.json() as any;
    const taskIndex = tasks.findIndex((t: any) => t.id === Number(id));
    
    if (taskIndex === -1) {
      return HttpResponse.json({ message: "Task not found" }, { status: 404 });
    }
    
    // Update the task
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = { ...tasks[taskIndex], ...updated };
    
    // Save updated tasks to localStorage
    saveTasksToStorage(updatedTasks);
    
    return HttpResponse.json(updatedTasks[taskIndex]);
  }),

  http.delete('/api/tasks/:id', ({ params }) => {
    // Get current tasks from localStorage
    const tasks = getTasksFromStorage();
    
    const { id } = params;
    const taskIndex = tasks.findIndex((t: any) => t.id === Number(id));
    
    if (taskIndex === -1) {
      return HttpResponse.json({ message: "Task not found" }, { status: 404 });
    }
    
    // Remove the task
    const updatedTasks = tasks.filter((_: any, index: number) => index !== taskIndex);
    
    // Save updated tasks to localStorage
    saveTasksToStorage(updatedTasks);
    
    return HttpResponse.json({ message: "Task deleted successfully" });
  }),
];
