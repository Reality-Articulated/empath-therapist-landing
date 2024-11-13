import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { init } from '@emailjs/browser';
import App from './App';
import './index.css';

// Initialize EmailJS with your public key
init("your_public_key"); // Replace with your EmailJS public key

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);