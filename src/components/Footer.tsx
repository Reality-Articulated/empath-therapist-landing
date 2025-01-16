import React from 'react';
import { Brain } from 'lucide-react';
import logo from '../../public/empath-logo.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img src={logo} alt="Empath Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-white">Empath</span>
            </div>
            <p className="text-sm">
              Empowering therapists.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>© 2023 Reality Articulated Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}