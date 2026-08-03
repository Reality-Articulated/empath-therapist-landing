import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import posthog from 'posthog-js';
import { LocaleShell } from './i18n/LocaleContext';
import { stripLocalePrefix, TRANSLATED_LOCALE_CODES } from './i18n/locales';
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
import SurveyPage from './pages/SurveyPage';
import CallMePage from './pages/CallMePage';
import UpgradePage from './pages/UpgradePage';
import BlogsPage from './pages/BlogsPage';
import SciencePage from './pages/SciencePage';
import BlogPostPage from './pages/BlogPostPage';
import JournalingBlogsPage from './pages/JournalingBlogsPage';
import JournalingBlogPostPage from './pages/JournalingBlogPostPage';
import { Analytics } from '@vercel/analytics/react';

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
      locale: stripLocalePrefix(location.pathname).locale,
      ...adParams
    });
  }, [location]);
  // Chrome visibility is locale-agnostic: /es/app hides the navbar like /app.
  const basePath = stripLocalePrefix(location.pathname).path;
  const hideNavbar = basePath.startsWith('/atman') || basePath.startsWith('/app') || ['/', '/about-atman', '/whyempath', '/quiz', '/survey', '/upgrade', '/call-me'].includes(basePath);

  // One shared route table, mounted at / (English) and under every locale
  // prefix (/es, /pt, …). Untranslated pages render English under a prefix;
  // their <SEO /> canonicals keep pointing at the English URL so localized
  // duplicates never compete in search.
  const routeChildren = (
    <>
      <Route index element={<JournalingPage />} />
      <Route path="therapist" element={<HomePage />} />
      <Route path="advisory" element={<AdvisoryPage />} />
      <Route path="atman/*" element={<AtmanPage src="https://atman-gamma.vercel.app/" />} />
      <Route path="about-atman" element={<AtmanPage src="https://atman-gamma.vercel.app/about-atman" />} />
      <Route path="whyempath" element={<ClientInfoPage />} />
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
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LocaleShell locale="en" />}>
          {routeChildren}
        </Route>
        {TRANSLATED_LOCALE_CODES.map((code) => (
          <Route key={code} path={`/${code}`} element={<LocaleShell locale={code} />}>
            {routeChildren}
          </Route>
        ))}
      </Routes>
      {!hideNavbar && <Footer />}
      <Analytics />
    </div>
  );
}

export default App;
