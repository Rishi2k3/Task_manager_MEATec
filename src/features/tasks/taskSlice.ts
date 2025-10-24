import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/api';
import type { Task } from '../../types/task';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  statusFilter: string;
}

const initialState: TaskState = {
  tasks: (() => {
    try {
      const stored = localStorage.getItem('tasks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  })(),
  isLoading: false,
  error: null,
  searchTerm: '',
  statusFilter: 'all',
};

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    try {
      const response = await api.get('/tasks');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      // Return empty array as fallback instead of rejecting
      return [];
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: Omit<Task, 'id' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create task');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, ...taskData }: Partial<Task> & { id: number }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete task');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = Array.isArray(action.payload) ? action.payload : [];
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
          localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchTerm, setStatusFilter, clearError } = taskSlice.actions;
export default taskSlice.reducer;
