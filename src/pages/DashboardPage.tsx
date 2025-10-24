import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logoutUser } from '../features/auth/authSlice';
import { setSearchTerm, setStatusFilter } from '../features/tasks/taskSlice';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { searchTerm, statusFilter } = useAppSelector((state) => state.tasks);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  );

  useEffect(() => {
    // Sync theme state on component mount
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedTheme);
    if (savedTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatusFilter(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-blue-200 dark:border-blue-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                NEXUS
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 ml-2">Task Command Center</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="sci-fi-button p-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                {isDarkMode ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Welcome, {user?.username}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  System Online • {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="sci-fi-button bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30 border border-red-300 dark:border-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-6">
          {/* Controls */}
          <div className="sci-fi-card border-2 border-accent/40">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="sci-fi-input w-full pl-10 pr-4 py-2"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  className="sci-fi-input px-4 py-2"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <button
                onClick={() => setIsTaskFormOpen(true)}
                className="sci-fi-button bg-gradient-to-r from-accent to-secondary text-accent-foreground font-semibold"
              >
                Add New Task
              </button>
            </div>
          </div>

          {/* Task List */}
          <TaskList />
        </div>
      </main>

      {/* Task Form Modal */}
      {isTaskFormOpen && (
        <TaskForm onClose={() => setIsTaskFormOpen(false)} />
      )}
    </div>
  );
};

export default DashboardPage;
