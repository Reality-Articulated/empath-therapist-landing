import React, { useEffect, useState, useRef } from 'react';
import posthog from 'posthog-js';

export default function AtmanPage({ src }: { src: string }) {
  const [iframeSrc, setIframeSrc] = useState(src);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    posthog.capture('atman_page_viewed');
    
    // Extract the current path and update iframe source
    const currentPath = window.location.pathname;
    const atmanPath = currentPath.replace('/atman', '') || '/';
    const baseUrl = src.replace(/\/$/, ''); // Remove trailing slash if present
    const fullUrl = `${baseUrl}${atmanPath}`;
    
    console.log('Setting iframe source to:', fullUrl);
    setIframeSrc(fullUrl);

    // Listen for navigation messages from the iframe
    const handleMessage = (event: MessageEvent) => {
      // Make sure the message is from your Vercel app
      if (!event.origin.includes('vercel.app') && !event.origin.includes(new URL(src).origin)) {
        return;
      }

      if (event.data.type === 'navigation' && event.data.path) {
        const newPath = `/atman${event.data.path}`;
        
        // Update the parent URL without refreshing
        if (window.location.pathname !== newPath) {
          window.history.pushState({}, '', newPath);
          posthog.capture('atman_navigation', { path: event.data.path });
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Handle browser back/forward buttons
    const handlePopState = () => {
      const currentPath = window.location.pathname;
      const atmanPath = currentPath.replace('/atman', '') || '/';
      const newUrl = `${baseUrl}${atmanPath}`;
      
      if (iframeRef.current && iframeRef.current.src !== newUrl) {
        setIframeSrc(newUrl);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [src]);

  return (
    <div className="w-full h-screen">
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        className="w-full h-full border-0"
        title="Call Journaling"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
} 