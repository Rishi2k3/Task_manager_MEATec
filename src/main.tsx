import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Initialize MSW in development
if (import.meta.env.DEV) {
  import('./mocks/browser').then(({ worker }) => {
    worker.start({
      onUnhandledRequest: 'bypass',
    }).catch((error) => {
      console.warn('MSW failed to start:', error);
    });
  }).catch((error) => {
    console.warn('Failed to load MSW:', error);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
