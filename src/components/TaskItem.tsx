import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { updateTask, deleteTask } from '../features/tasks/taskSlice';
import EditTaskForm from './EditTaskForm';
import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleStatusChange = (newStatus: Task['status']) => {
    dispatch(updateTask({ id: task.id, status: newStatus }));
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-600 border-green-500/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <>
      <div className="sci-fi-card border-accent/30 hover:border-accent/60 transition-all group">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                {task.title}
              </h3>
              <span className={`text-xs px-2 py-1 rounded border font-medium ${getStatusColor(task.status)}`}>
                {task.status.replace('-', ' ')}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="sci-fi-button px-3 py-1 text-sm bg-secondary/20 text-secondary hover:bg-secondary/30 border border-secondary/30"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="sci-fi-button px-3 py-1 text-sm bg-destructive/20 text-destructive hover:bg-destructive/30 border border-destructive/30"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          {(['pending', 'in-progress', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`text-xs px-2 py-1 rounded transition-all ${
                task.status === status
                  ? 'bg-accent/30 text-accent border border-accent/50'
                  : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 border border-muted/30'
              }`}
            >
              {status.replace('-', ' ')}
            </button>
          ))}
        </div>

        <div className="mt-3 text-xs text-muted-foreground">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Edit Task Modal */}
      {isEditModalOpen && (
        <EditTaskForm
          task={task}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
};

export default TaskItem;
