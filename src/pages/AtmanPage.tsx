import React from 'react';

export default function AtmanPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://calljournaling.lovable.app/"
        className="w-full h-full border-0"
        title="Call Journaling"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
} 