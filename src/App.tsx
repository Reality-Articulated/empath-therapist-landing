import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdvisoryPage from './pages/AdvisoryPage';
import AtmanPage from './pages/AtmanPage';
// import BlogsPage from './pages/BlogsPage';

function App() {
  const location = useLocation();
  const isAtmanPage = location.pathname === '/atman';

  return (
    <div className="min-h-screen flex flex-col">
      {!isAtmanPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/advisory" element={<AdvisoryPage />} />
        <Route path="/atman" element={<AtmanPage />} />
        {/* // <Route path="/blogs" element={<BlogsPage />} /> */}
      </Routes>
      {!isAtmanPage && <Footer />}
    </div>
  );
}

export default App;