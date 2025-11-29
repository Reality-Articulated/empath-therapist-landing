import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { PostHogProvider } from 'posthog-js/react';

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  disable_toolbar: import.meta.env.PROD, // Disable toolbar in production
  opt_out_capture_by_default: false,
  loaded: function(posthog: any) {
    // Force disable toolbar in production
    if (import.meta.env.PROD) {
      posthog.set_config({ disable_toolbar: true });
      // Clear any existing toolbar session
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('__ph_toolbar_session');
        window.sessionStorage.removeItem('__ph_toolbar_session');
      }
    }
    if (import.meta.env.DEV) {
      posthog.debug(); // Only enable debug in development
    }
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PostHogProvider
        apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
        options={options}
      >
        <App />
      </PostHogProvider>
    </BrowserRouter>
  </StrictMode>
);
