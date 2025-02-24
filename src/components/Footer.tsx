import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../public/empath-logo.png';
import { Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-400 py-16 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Empath Logo" className="w-10 h-10" />
              <span className="text-2xl font-bold text-white">Empath</span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Empowering therapists with tools that enhance the therapeutic relationship through data-driven insights.
            </p>
            <div className="flex space-x-4 pt-2">
              <motion.a 
                href="https://twitter.com/empathdash" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ y: -3, scale: 1.1 }}
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/company/empathdash" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ y: -3, scale: 1.1 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                href="mailto:info@empathdash.com" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ y: -3, scale: 1.1 }}
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/advisory" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                  Advisory Program
                </Link>
              </li>
              <li>
                <a 
                  href="https://app.empathdash.com/login" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  Sign In <ArrowUpRight size={14} className="ml-1" />
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Contact Us</h3>
            <p className="text-gray-400 mb-4">
              Have questions or want to learn more about Empath?
            </p>
            <motion.a 
              href="mailto:info@empathdash.com"
              className="inline-block px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-900/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm">© {currentYear} Reality Articulated Inc. All rights reserved.</p>
          <p className="text-xs text-gray-600 mt-2">
            Empath is committed to protecting client privacy and maintaining HIPAA compliance.
          </p>
        </div>
      </div>
    </footer>
  );
}