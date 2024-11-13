import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdvisoryPage from './pages/AdvisoryPage';

function App() {
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