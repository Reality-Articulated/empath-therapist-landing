import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import { PostHogProvider } from 'posthog-js/react';
import type { PostHog } from 'posthog-js';

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  disable_toolbar: import.meta.env.PROD, // Disable toolbar in production
  opt_out_capture_by_default: false,
  loaded: function(posthog: PostHog) {
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

const rootElement = document.getElementById('root')!;
// Production builds include readable fallback HTML for non-JS crawlers.
rootElement.replaceChildren();
document.querySelectorAll('[data-prerendered-schema]').forEach((node) => node.remove());

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <PostHogProvider
        apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
        options={options}
      >
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </PostHogProvider>
    </BrowserRouter>
  </StrictMode>
);
