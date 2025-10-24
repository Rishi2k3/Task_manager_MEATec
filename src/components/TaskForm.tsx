import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createTask } from '../features/tasks/taskSlice';
import type { Task } from '../types/task';

interface TaskFormProps {
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Title is required')
      .min(3, 'Title must be at least 3 characters'),
    description: Yup.string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters'),
    status: Yup.string()
      .oneOf(['pending', 'in-progress', 'completed'], 'Invalid status')
      .required('Status is required'),
  });

  const handleSubmit = async (values: { title: string; description: string; status: string }) => {
    const result = await dispatch(createTask({
      title: values.title,
      description: values.description,
      status: values.status as Task['status']
    }));
    if (createTask.fulfilled.match(result)) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 w-96">
        <div className="sci-fi-card border-2 border-accent/40">
          <h3 className="text-lg font-bold mb-4 text-accent">
            Create New Task
          </h3>
          <Formik
            initialValues={{ title: '', description: '', status: 'pending' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2 text-foreground">
                  Title
                </label>
                <Field
                  name="title"
                  type="text"
                  className="sci-fi-input w-full"
                  placeholder="Enter task title"
                />
                <ErrorMessage name="title" component="div" className="text-destructive text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2 text-foreground">
                  Description
                </label>
                <Field
                  name="description"
                  as="textarea"
                  rows={3}
                  className="sci-fi-input w-full resize-none"
                  placeholder="Enter task description"
                />
                <ErrorMessage name="description" component="div" className="text-destructive text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-2 text-foreground">
                  Status
                </label>
                <Field
                  name="status"
                  as="select"
                  className="sci-fi-input w-full"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Field>
                <ErrorMessage name="status" component="div" className="text-destructive text-xs mt-1" />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="sci-fi-button px-4 py-2 text-sm bg-muted/20 text-muted-foreground hover:bg-muted/30 border border-muted/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="sci-fi-button px-4 py-2 text-sm bg-gradient-to-r from-accent to-secondary text-accent-foreground font-semibold"
                >
                  Create Task
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
