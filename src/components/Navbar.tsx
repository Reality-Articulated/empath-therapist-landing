import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../public/empath-logo.png';
import { Brain } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Empath Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900">Empath</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium ${
                location.pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/advisory" 
              className={`text-sm font-medium ${
                location.pathname === '/advisory' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Advisory Program
            </Link>
            <a 
  href="https://www.empathdash.com/login" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
>
  Existing Users?
</a>
          </div>
        </div>
      </div>
    </nav>
  );
}