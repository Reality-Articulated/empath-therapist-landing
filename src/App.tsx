import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdvisoryPage from './pages/AdvisoryPage';
import AtmanPage from './pages/AtmanPage';
import ClientInfoPage from './pages/ClientInfoPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import PledgePage from './pages/PledgePage';
import TherapyValueCalculator from './pages/TherapyValueCalculator';
import TherapyValueCalculatorDirect from './pages/TherapyValueCalculatorDirect';
// import BlogsPage from './pages/BlogsPage';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/atman') || ['/about-atman', '/whyempath'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/advisory" element={<AdvisoryPage />} />
        <Route path="/atman/*" element={<AtmanPage src="https://atman-gamma.vercel.app/" />} />
        <Route path="/about-atman" element={<AtmanPage src="https://atman-gamma.vercel.app/about-atman" />} />
        <Route path="/whyempath" element={<ClientInfoPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/pledge" element={<PledgePage />} />
        <Route path="/calculator" element={<TherapyValueCalculator />} />
        <Route path="/calculator-direct" element={<TherapyValueCalculatorDirect />} />
        {/* // <Route path="/blogs" element={<BlogsPage />} /> */}
      </Routes>
      {!hideNavbar && <Footer />}
      <Analytics />
    </div>
  );
}

export default App;