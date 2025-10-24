import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTasks } from '../features/tasks/taskSlice';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, isLoading, error, searchTerm, statusFilter } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Ensure tasks is always an array
  const tasksArray = Array.isArray(tasks) ? tasks : [];
  
  const filteredTasks = tasksArray.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg font-medium">Error: {error}</div>
        <button
          onClick={() => dispatch(fetchTasks())}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {filteredTasks.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            {searchTerm || statusFilter !== 'all' ? 'No tasks match your filters' : 'No tasks yet'}
          </div>
          <div className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            {!searchTerm && statusFilter === 'all' && 'Create your first task to get started'}
          </div>
        </div>
      ) : (
        filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;
