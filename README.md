# Task Manager Application

A full-stack task management application built with React, TypeScript, Redux Toolkit, and Tailwind CSS.

## Features

- 🔐 **Authentication**: Mock login/logout with JWT tokens
- 📋 **Task Management**: Full CRUD operations for tasks
- 🎨 **Modern UI**: Responsive design with Tailwind CSS
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 🔍 **Search & Filter**: Search tasks and filter by status
- 📱 **Responsive**: Works on desktop and mobile devices
- 💾 **Persistence**: Local storage for tasks and user preferences

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Forms**: Formik + Yup validation
- **Mocking**: MSW (Mock Service Worker)
- **HTTP Client**: Axios

## Project Structure

```
src/
├── api/                    # API configuration
├── app/                    # Redux store setup
├── components/             # Reusable UI components
│   ├── TaskForm.tsx       # Task creation/editing form
│   ├── TaskItem.tsx       # Individual task display
│   └── TaskList.tsx       # Task list container
├── features/              # Feature-based Redux slices
│   ├── auth/              # Authentication slice
│   └── tasks/             # Task management slice
├── mocks/                 # MSW mock handlers
│   ├── browser.ts        # MSW browser setup
│   └── handlers.ts       # API mock handlers
├── pages/                 # Page components
│   ├── LoginPage.tsx     # Login page
│   └── DashboardPage.tsx # Main dashboard
└── main.tsx              # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Login Credentials

Use the following credentials to login:
- **Username**: `test`
- **Password**: `test123`

## How MSW Mocks the API

The application uses Mock Service Worker (MSW) to simulate a backend API:

- **Authentication**: `/api/login` - Validates credentials and returns JWT token
- **Tasks**: 
  - `GET /api/tasks` - Fetch all tasks with optional search and status filtering
  - `POST /api/tasks` - Create new task
  - `PUT /api/tasks/:id` - Update existing task
  - `DELETE /api/tasks/:id` - Delete task

MSW intercepts all API calls and returns mock data, allowing the application to work without a real backend.

## Features Overview

### Authentication
- Mock login with static credentials
- JWT token storage in localStorage
- Automatic logout on token expiration
- Protected routes

### Task Management
- Create, read, update, and delete tasks
- Task status management (Pending, In Progress, Completed)
- Real-time search functionality
- Status-based filtering
- Form validation with Formik and Yup

### User Interface
- Responsive design with Tailwind CSS
- Dark mode toggle with persistence
- Loading states and error handling
- Clean, modern card-based layout
- Accessible form controls

### State Management
- Redux Toolkit for predictable state management
- Local storage persistence for tasks and user data
- Optimistic updates for better UX
- Error handling and loading states

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Structure

The application follows a feature-based architecture:

- **Slices**: Redux slices for auth and tasks
- **Components**: Reusable UI components
- **Pages**: Route-level components
- **API**: Centralized API configuration
- **Mocks**: MSW handlers for development

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel deploy
```

3. Follow the prompts to configure your deployment

### Environment Variables

No environment variables are required for this application as it uses MSW for API mocking.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] Real backend integration
- [ ] User registration
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] File attachments
- [ ] Team collaboration features
- [ ] Advanced filtering and sorting
- [ ] Export functionality
- [ ] Mobile app (React Native)
- [ ] Real-time updates with WebSockets