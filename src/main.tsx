import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { init } from '@emailjs/browser';
import App from './App';
import './index.css';
import { PostHogProvider } from 'posthog-js/react';

// Initialize EmailJS with your public key
init("your_public_key"); // Replace with your EmailJS public key

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
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