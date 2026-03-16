import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import posthog from 'posthog-js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdvisoryPage from './pages/AdvisoryPage';
import AtmanPage from './pages/AtmanPage';
import ClientInfoPage from './pages/ClientInfoPage';
import JournalingPage from './pages/JournalingPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import PledgePage from './pages/PledgePage';
import TransparencyPage from './pages/TransparencyPage';
import TherapyValueCalculator from './pages/TherapyValueCalculator';
import TherapyValueCalculatorDirect from './pages/TherapyValueCalculatorDirect';
import AIReadinessQuiz from './pages/AIReadinessQuiz';
// import BlogsPage from './pages/BlogsPage';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const location = useLocation();

  // Track page views and capture ad engagement parameters
  useEffect(() => {
    // Get URL search parameters
    const searchParams = new URLSearchParams(location.search);
    
    // Capture UTM parameters and Reddit ad parameters
    const adParams: Record<string, string> = {};
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const redditParams = ['reddit_ad_id', 'reddit_campaign_id', 'reddit_adgroup_id'];
    
    [...utmParams, ...redditParams].forEach(param => {
      const value = searchParams.get(param);
      if (value) {
        adParams[param] = value;
      }
    });

    // Store ad parameters in PostHog super properties if present
    if (Object.keys(adParams).length > 0) {
      posthog.register(adParams);
      posthog.capture('ad_engagement_parameters_captured', adParams);
    }

    // Track page view
    posthog.capture('$pageview', {
      path: location.pathname,
      search: location.search,
      ...adParams
    });
  }, [location]);
  const hideNavbar = location.pathname.startsWith('/atman') || ['/about-atman', '/whyempath', '/quiz', '/app'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/advisory" element={<AdvisoryPage />} />
        <Route path="/atman/*" element={<AtmanPage src="https://atman-gamma.vercel.app/" />} />
        <Route path="/about-atman" element={<AtmanPage src="https://atman-gamma.vercel.app/about-atman" />} />
        <Route path="/whyempath" element={<ClientInfoPage />} />
        <Route path="/app" element={<JournalingPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/pledge" element={<PledgePage />} />
        <Route path="/transparency" element={<TransparencyPage />} />
        <Route path="/calculator" element={<TherapyValueCalculator />} />
        <Route path="/calculator-direct" element={<TherapyValueCalculatorDirect />} />
        <Route path="/quiz" element={<AIReadinessQuiz />} />
        {/* // <Route path="/blogs" element={<BlogsPage />} /> */}
      </Routes>
      {!hideNavbar && <Footer />}
      <Analytics />
    </div>
  );
}

export default App;