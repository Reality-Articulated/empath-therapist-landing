import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import posthog from 'posthog-js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdvisoryPage from './pages/AdvisoryPage';
import AtmanPage from './pages/AtmanPage';
import JournalingPage from './pages/JournalingPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import PledgePage from './pages/PledgePage';
import TransparencyPage from './pages/TransparencyPage';
import TherapyValueCalculator from './pages/TherapyValueCalculator';
import TherapyValueCalculatorDirect from './pages/TherapyValueCalculatorDirect';
import AIReadinessQuiz from './pages/AIReadinessQuiz';
import SurveyPage from './pages/SurveyPage';
import CallMePage from './pages/CallMePage';
import UpgradePage from './pages/UpgradePage';
import BlogsPage from './pages/BlogsPage';
import SciencePage from './pages/SciencePage';
import BlogPostPage from './pages/BlogPostPage';
import JournalingBlogsPage from './pages/JournalingBlogsPage';
import JournalingBlogPostPage from './pages/JournalingBlogPostPage';
import PhraseLandingPage from './pages/PhraseLandingPage';
import { phrasePages } from './data/phrasePages';
import { Analytics } from '@vercel/analytics/react';
import { GOOGLE_CLICK_ID_PARAMS } from './utils/googleAds';
import { syncSmartAppBanner } from './utils/smartAppBanner';

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Track page views and capture ad engagement parameters
  useEffect(() => {
    // Get URL search parameters
    const searchParams = new URLSearchParams(location.search);
    
    // Capture UTM parameters, Reddit ad parameters and Google click IDs
    // (gclid/gbraid/wbraid — kept as super properties so a channel
    // conversation started from this session can later be uploaded to
    // Google Ads as an offline conversion).
    const adParams: Record<string, string> = {};
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const redditParams = ['reddit_ad_id', 'reddit_campaign_id', 'reddit_adgroup_id'];

    [...utmParams, ...redditParams, ...GOOGLE_CLICK_ID_PARAMS].forEach(param => {
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
  const basePath = location.pathname;

  // Therapist pages never advertise the consumer iOS app (Smart App Banner).
  useEffect(() => {
    syncSmartAppBanner(basePath);
  }, [basePath]);

  const hideNavbar =
    basePath.startsWith('/atman') ||
    basePath.startsWith('/app') ||
    basePath.startsWith('/blog/') ||
    ['/', '/therapist', '/advisory', '/about-atman', '/quiz', '/survey', '/upgrade', '/call-me', '/blog', '/blogs'].includes(basePath) ||
    phrasePages.some((p) => basePath === `/${p.slug}`);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route index element={<JournalingPage />} />
        <Route path="therapist" element={<HomePage />} />
        <Route path="advisory" element={<AdvisoryPage />} />
        <Route path="atman/*" element={<AtmanPage src="https://atman-gamma.vercel.app/" />} />
        <Route path="about-atman" element={<AtmanPage src="https://atman-gamma.vercel.app/about-atman" />} />
        <Route path="app" element={<JournalingPage />} />
        <Route path="app/blog" element={<JournalingBlogsPage />} />
        <Route path="app/blog/:slug" element={<JournalingBlogPostPage />} />
        <Route path="privacy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="pledge" element={<PledgePage />} />
        <Route path="transparency" element={<TransparencyPage />} />
        <Route path="calculator" element={<TherapyValueCalculator />} />
        <Route path="calculator-direct" element={<TherapyValueCalculatorDirect />} />
        <Route path="quiz" element={<AIReadinessQuiz />} />
        <Route path="survey" element={<SurveyPage />} />
        <Route path="call-me" element={<CallMePage />} />
        <Route path="upgrade" element={<UpgradePage />} />
        <Route path="science" element={<SciencePage />} />
        <Route path="blog" element={<BlogsPage />} />
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        {phrasePages.map((entry) => (
          <Route key={entry.slug} path={entry.slug} element={<PhraseLandingPage entry={entry} />} />
        ))}
      </Routes>
      {!hideNavbar && <Footer />}
      <Analytics />
    </div>
  );
}

export default App;
