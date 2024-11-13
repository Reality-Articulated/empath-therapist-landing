import React from 'react';
import { Brain } from 'lucide-react';
import logo from '../../public/empath-logo.png';
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Empath Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-white">Empath</span>
            </div>
            <p className="text-sm">
              Empowering therapists.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/advisory" className="hover:text-white transition-colors">Advisory Program</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>© 2024 Reality Articulated Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}