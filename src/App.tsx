import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdvisoryPage from './pages/AdvisoryPage';
import { analytics } from './services/analytics';

function App() {
  const location = useLocation();
  
  // Track page views when routes change
  useEffect(() => {
    const pageName = location.pathname === '/' ? 'Home' : 
                     location.pathname.charAt(1).toUpperCase() + 
                     location.pathname.slice(2).replace(/-/g, ' ');
    
    analytics.trackPageView(pageName, {
      path: location.pathname,
      search: location.search,
      referrer: document.referrer,
    });
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/advisory" element={<AdvisoryPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;