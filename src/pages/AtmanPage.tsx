import React, { useEffect } from 'react';
import posthog from 'posthog-js';

export default function AtmanPage({ src }: { src: string }) {
  useEffect(() => {
    posthog.capture('atman_page_viewed');
  }, []);

  return (
    <div className="w-full h-screen">
      <iframe
        src={src}
        className="w-full h-full border-0"
        title="Call Journaling"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
} 