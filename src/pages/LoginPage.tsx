import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginUser, clearError } from '../features/auth/authSlice';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, token } = useAppSelector((state) => state.auth);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  );

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

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

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = async (values: { username: string; password: string }) => {
    dispatch(clearError());
    const result = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Centered Form */}
      <main className="w-full flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md space-y-8 px-4">
        <div className="sci-fi-card border-2 border-blue-300 dark:border-blue-600">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Use test/test123 to login
            </p>
          </div>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <Field
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="sci-fi-input w-full"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="sci-fi-input w-full"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="sci-fi-button w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
