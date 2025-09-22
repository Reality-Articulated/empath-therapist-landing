import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../public/empath-logo.png';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'
  }`;
  
  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group" aria-label="Empath Home">
            <motion.img 
              src={logo} 
              alt="Empath Logo" 
              className="w-9 h-9"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">Empath</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-all duration-300 relative ${
                location.pathname === '/' 
                  ? 'text-blue-700' 
                  : 'text-gray-700 hover:text-blue-700'
              }`}
              aria-current={location.pathname === '/' ? 'page' : undefined}
            >
              <span>For Therapists</span>
              {location.pathname === '/' && (
                <motion.div 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full"
                  layoutId="navIndicator"
                />
              )}
            </Link>
            <Link 
              to="/whyempath" 
              className={`text-sm font-medium transition-all duration-300 relative ${
                location.pathname === '/whyempath' 
                  ? 'text-blue-700' 
                  : 'text-gray-700 hover:text-blue-700'
              }`}
              aria-current={location.pathname === '/whyempath' ? 'page' : undefined}
            >
              <span>For Therapy Clients</span>
              {location.pathname === '/whyempath' && (
                <motion.div 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full"
                  layoutId="navIndicator"
                />
              )}
            </Link>
            <Link 
              to="/advisory" 
              className={`text-sm font-medium transition-all duration-300 relative ${
                location.pathname === '/advisory' 
                  ? 'text-blue-700' 
                  : 'text-gray-700 hover:text-blue-700'
              }`}
              aria-current={location.pathname === '/advisory' ? 'page' : undefined}
            >
              <span>Advisory</span>
              {location.pathname === '/advisory' && (
                <motion.div 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full"
                  layoutId="navIndicator"
                />
              )}
            </Link>
            <motion.a 
              href="https://app.empathdash.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-700 to-indigo-700 rounded-lg hover:shadow-md hover:shadow-blue-200 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Sign In to Empath Dashboard"
            >
              Sign In
            </motion.a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-700 focus:outline-none"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4 px-4">
              <Link 
                to="/" 
                className={`text-sm font-medium py-2 ${
                  location.pathname === '/' ? 'text-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                For Therapists
              </Link>
              <Link 
                to="/whyempath" 
                className={`text-sm font-medium py-2 ${
                  location.pathname === '/whyempath' ? 'text-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                For Therapy Clients
              </Link>
              <Link 
                to="/advisory" 
                className={`text-sm font-medium py-2 ${
                  location.pathname === '/advisory' ? 'text-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Advisory Program
              </Link>
              <a 
                href="https://app.empathdash.com/login" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium py-2 px-4 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}