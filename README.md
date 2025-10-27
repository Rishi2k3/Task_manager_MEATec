# 🚀 Task Manager Application

A modern, full-stack task management application built with React 19, TypeScript, and Redux Toolkit. Features a sci-fi themed UI with dark/light mode, real-time task management, and complete authentication system.

## 🌐 Live Demo

**🔗 Production URL**: [https://task-manager-lpoa3u32i-rishi-agarwals-projects-ef70ecc3.vercel.app](https://task-manager-lpoa3u32i-rishi-agarwals-projects-ef70ecc3.vercel.app)

**🔑 Demo Credentials**:
- Username: `test`
- Password: `test123`

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Theory & Concepts](#-theory--concepts)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 Authentication System
- **JWT-based Authentication**: Secure token-based login system
- **Protected Routes**: Dashboard accessible only after authentication
- **Auto-logout**: Automatic logout on token expiration
- **Persistent Sessions**: Login state persists across browser sessions

### 📋 Task Management
- **Full CRUD Operations**: Create, Read, Update, Delete tasks
- **Task States**: Pending, In Progress, Completed
- **Real-time Search**: Instant search across task titles and descriptions
- **Status Filtering**: Filter tasks by completion status
- **Form Validation**: Comprehensive validation with error messages

### 🎨 User Interface
- **Sci-fi Theme**: Futuristic design with blue/cyan gradients
- **Dark/Light Mode**: Toggle between themes with persistence
- **Responsive Design**: Mobile-first approach, works on all devices
- **Loading States**: Smooth loading indicators and error handling
- **Accessibility**: Keyboard navigation and screen reader support

### 💾 Data Persistence
- **Local Storage**: Tasks and user preferences persist across sessions
- **Mock API**: Complete backend simulation with MSW
- **Optimistic Updates**: Immediate UI updates for better UX

## 🛠️ Tech Stack

### Frontend Technologies
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript for better development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### State Management
- **Redux Toolkit** - Modern Redux with less boilerplate
- **React Redux** - Official React bindings for Redux

### Routing & Forms
- **React Router DOM** - Client-side routing
- **Formik** - Form state management
- **Yup** - Schema validation

### API & Testing
- **Axios** - HTTP client with interceptors
- **MSW (Mock Service Worker)** - API mocking for development

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS post-processing
- **Autoprefixer** - CSS vendor prefixing

### Deployment
- **Vercel** - Cloud platform for frontend deployment

## 📚 Theory & Concepts

### What is React?
React is a JavaScript library for building user interfaces, particularly web applications. It uses a component-based architecture where UI is broken down into reusable pieces called components. React uses a virtual DOM (Document Object Model) for efficient updates and rendering.

**Key Concepts:**
- **Components**: Reusable pieces of UI that can have their own state and props
- **JSX**: JavaScript XML syntax that allows writing HTML-like code in JavaScript
- **State**: Data that can change over time and affects component rendering
- **Props**: Data passed from parent to child components
- **Hooks**: Functions that let you use state and other React features in functional components

### What is TypeScript?
TypeScript is a strongly typed programming language that builds on JavaScript. It adds static type definitions to JavaScript, which helps catch errors during development and provides better tooling support.

**Benefits:**
- **Type Safety**: Catches errors at compile time
- **Better IDE Support**: Enhanced autocomplete and error detection
- **Self-Documenting Code**: Types serve as documentation
- **Refactoring**: Safer code changes with type checking

### What is Redux?
Redux is a predictable state container for JavaScript applications. It helps manage application state in a single immutable store, making state changes predictable and debuggable.

**Core Concepts:**
- **Store**: Single source of truth for application state
- **Actions**: Plain objects describing what happened
- **Reducers**: Pure functions that specify how state changes
- **Dispatch**: Method to trigger state changes
- **Selectors**: Functions to extract specific pieces of state

### What is Redux Toolkit?
Redux Toolkit (RTK) is the official, opinionated, batteries-included toolset for efficient Redux development. It addresses common concerns about Redux being too verbose or complex.

**Key Features:**
- **createSlice**: Reduces boilerplate for creating reducers and actions
- **createAsyncThunk**: Handles async operations with loading states
- **configureStore**: Sets up store with good defaults
- **Immer**: Enables "mutating" logic in reducers

### What is MSW (Mock Service Worker)?
MSW is a library that intercepts network requests at the service worker level, allowing you to mock APIs without changing your application code. It works in both browser and Node.js environments.

**How MSW Works:**
1. **Service Worker**: Intercepts network requests before they reach the network
2. **Handlers**: Define mock responses for specific API endpoints
3. **Seamless Integration**: Works with any HTTP client (Axios, Fetch, etc.)
4. **Development & Testing**: Can be used in both development and testing environments

**Benefits:**
- **No Code Changes**: Works with existing API calls
- **Realistic Testing**: Simulates real network conditions
- **Offline Development**: Develop without backend dependencies
- **Consistent Data**: Predictable responses for testing

### What is a Mock API?
A Mock API is a simulated backend API that returns fake data instead of making real network requests. It's used during development and testing when the real backend isn't available or ready.

**Types of Mock APIs:**
- **Static Mocks**: Return the same data every time
- **Dynamic Mocks**: Can modify data based on requests
- **Behavioral Mocks**: Simulate different scenarios (success, error, loading)

**Use Cases:**
- **Frontend Development**: Develop UI without waiting for backend
- **Testing**: Isolated testing of frontend components
- **Prototyping**: Quick validation of API designs
- **Offline Development**: Work without internet connection

### What is Context API?
React Context API is a way to share data between components without prop drilling. It provides a way to pass data through the component tree without having to pass props down manually at every level.

**When to Use Context API:**
- **Global State**: Data needed by many components
- **Theme Data**: Dark/light mode preferences
- **User Authentication**: User data and login status
- **Language Settings**: Internationalization data

**Context API vs Redux:**
- **Context API**: Better for simple, rarely changing data
- **Redux**: Better for complex state with frequent updates
- **Performance**: Redux has better performance for large applications
- **DevTools**: Redux has better debugging tools

### What is Axios?
Axios is a promise-based HTTP client for JavaScript that works in both browser and Node.js environments. It provides an easy-to-use API for making HTTP requests.

**Key Features:**
- **Promise-based**: Uses Promises for async operations
- **Request/Response Interceptors**: Modify requests and responses globally
- **Automatic JSON Parsing**: Automatically parses JSON responses
- **Error Handling**: Built-in error handling for HTTP errors
- **Request Cancellation**: Cancel requests when needed

### What is Tailwind CSS?
Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without leaving your HTML.

**Utility-First Approach:**
- **Small Utilities**: Single-purpose classes for styling
- **Composable**: Combine utilities to create complex designs
- **Responsive**: Built-in responsive design utilities
- **Customizable**: Easy to customize colors, spacing, and other design tokens

**Benefits:**
- **Rapid Development**: Style components quickly
- **Consistency**: Consistent spacing and design system
- **Small Bundle Size**: Unused styles are purged in production
- **No Context Switching**: Style directly in JSX

### What is Vite?
Vite is a build tool and development server that provides fast development experience with Hot Module Replacement (HMR) and optimized production builds.

**Key Features:**
- **Fast Dev Server**: Uses native ES modules for instant server start
- **HMR**: Hot Module Replacement for instant updates
- **Optimized Builds**: Uses Rollup for production builds
- **Plugin System**: Extensible with plugins
- **TypeScript Support**: Built-in TypeScript support

### What is React Router?
React Router is a standard library for routing in React applications. It enables navigation between different components in a single-page application.

**Key Concepts:**
- **Routes**: Define which component to render for each URL
- **Navigation**: Programmatic navigation between routes
- **Nested Routes**: Routes within routes for complex layouts
- **Route Parameters**: Dynamic segments in URLs
- **Route Guards**: Protect routes with authentication

## 🏗️ Project Structure

```
src/
├── api/                    # API configuration
│   └── api.ts             # Axios instance with interceptors
├── app/                    # Redux store setup
│   ├── hooks.ts           # Typed Redux hooks
│   └── store.ts           # Store configuration
├── components/             # Reusable UI components
│   ├── EditTaskForm.tsx   # Task editing modal
│   ├── ProtectedRoute.tsx # Authentication guard
│   ├── TaskForm.tsx       # Task creation modal
│   ├── TaskItem.tsx       # Individual task card
│   └── TaskList.tsx       # Task list container
├── features/              # Feature-based Redux slices
│   ├── auth/              # Authentication feature
│   │   └── authSlice.ts   # Auth state management
│   └── tasks/             # Task management feature
│       └── taskSlice.ts   # Task state management
├── lib/                   # Utility functions
│   └── utils.ts           # Helper functions
├── mocks/                 # Mock Service Worker setup
│   ├── browser.ts         # MSW browser setup
│   └── handlers.ts        # API mock handlers
├── pages/                 # Route-level components
│   ├── DashboardPage.tsx  # Main dashboard
│   └── LoginPage.tsx      # Login interface
├── types/                 # TypeScript type definitions
│   └── task.ts            # Task interface
├── App.tsx                # Main app component
├── App.css                # Global styles
├── index.css              # Tailwind CSS imports
└── main.tsx               # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Rishi2k3/Task_manager_MEATec.git
cd Task_manager_MEATec
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📡 API Documentation

### Authentication Endpoints

#### POST /api/login
**Description**: Authenticate user and return JWT token

**Request Body**:
```json
{
  "username": "test",
  "password": "test123"
}
```

**Response**:
```json
{
  "token": "fake-jwt-token",
  "user": {
    "id": 1,
    "username": "test"
  }
}
```

#### POST /api/logout
**Description**: Logout user and invalidate session

**Response**:
```json
{
  "message": "Logged out successfully"
}
```

### Task Endpoints

#### GET /api/tasks
**Description**: Fetch all tasks with optional filtering

**Query Parameters**:
- `status` (optional): Filter by task status
- `search` (optional): Search in title and description

**Response**:
```json
[
  {
    "id": 1,
    "title": "Learn React",
    "description": "Study hooks and components",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /api/tasks
**Description**: Create a new task

**Request Body**:
```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "pending"
}
```

**Response**:
```json
{
  "id": 4,
  "title": "New Task",
  "description": "Task description",
  "status": "pending",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### PUT /api/tasks/:id
**Description**: Update an existing task

**Path Parameters**:
- `id`: Task ID

**Request Body**:
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "in-progress"
}
```

#### DELETE /api/tasks/:id
**Description**: Delete a task

**Path Parameters**:
- `id`: Task ID

**Response**:
```json
{
  "message": "Task deleted successfully"
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel --prod
```

3. **Follow the prompts** to configure your deployment

### Environment Variables

No environment variables are required as the application uses MSW for API mocking.

## 🔧 Development

### Code Structure

The application follows a feature-based architecture:

- **Slices**: Redux slices for auth and tasks
- **Components**: Reusable UI components
- **Pages**: Route-level components
- **API**: Centralized API configuration
- **Mocks**: MSW handlers for development

### Key Features Implementation

#### Authentication Flow
1. User enters credentials in LoginPage
2. Formik validates input with Yup schema
3. Redux thunk makes API call to /api/login
4. On success, JWT token stored in localStorage
5. User redirected to dashboard
6. ProtectedRoute checks token on route access

#### Task Management Flow
1. Tasks fetched on dashboard load
2. User can create, edit, delete tasks
3. All operations update Redux state
4. Changes persisted in localStorage via MSW
5. Real-time search and filtering

#### State Management
- **Auth State**: User data, token, loading, errors
- **Task State**: Task list, search, filters, loading
- **UI State**: Theme, modals, form states

## 🎯 Future Enhancements

- [ ] Real backend integration with Node.js/Express
- [ ] User registration and profile management
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] File attachments for tasks
- [ ] Team collaboration features
- [ ] Advanced filtering and sorting
- [ ] Export functionality (PDF, CSV)
- [ ] Mobile app with React Native
- [ ] Real-time updates with WebSockets
- [ ] Unit and integration tests
- [ ] CI/CD pipeline setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rishi Agarwal**
- GitHub: [@Rishi2k3](https://github.com/Rishi2k3)
- Project Link: [https://github.com/Rishi2k3/Task_manager_MEATec](https://github.com/Rishi2k3/Task_manager_MEATec)

## 🙏 Acknowledgments

- React team for the amazing framework
- Redux team for state management
- Tailwind CSS team for the utility-first approach
- MSW team for API mocking capabilities
- Vercel for seamless deployment experience

---

**⭐ If you found this project helpful, please give it a star!**