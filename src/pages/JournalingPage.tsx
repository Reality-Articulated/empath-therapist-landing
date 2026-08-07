import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Shield,
  Phone,
  PhoneCall,
  MessageSquare,
  Zap,
  ChevronDown,
  Star,
  TrendingUp,
  Camera,
  Mic,
  Brain,
  Heart,
  Activity,
  Calendar,
  Sparkles,
  Lock,
  BarChart3,
  FileText,
  Image as ImageIcon,
  MessageCircle,
  AudioWaveform,
  ScanText,
  Users,
  ScanFace,
  PenSquare,
  Lightbulb,
  LayoutGrid,
  UserSquare,
  SquareStack,
  Upload,
  WifiOff
} from 'lucide-react';
import logo from '../../public/empath-logo.png';
import { Toaster } from 'react-hot-toast';
import posthog from 'posthog-js';
import { useFeatureFlagVariantKey } from 'posthog-js/react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import MessagingChannelsCarousel from '../components/MessagingChannelsCarousel';
import WhatsAppExamples from '../components/WhatsAppExamples';
import CrossChannelStory from '../components/CrossChannelStory';
import CallMeForm from '../components/CallMeForm';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { WhatsAppIcon } from '../components/ChannelIcons';
import { useJournalingCopy } from '../i18n/copy';
import { openSupportChat } from '../utils/supportChat';
import { SMS_ENABLED } from '../utils/channels';
import { buildChannelHref, captureChannelLinkClick, getChannelRefCode } from '../utils/attribution';
import DesktopQRCodes from '../components/DesktopQRCodes';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// FAQ Accordion Item Component
const FAQItem = ({ question, answer }: { question: string; answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-2 border-stone-200 last:border-b-0">
      <button
        className="w-full py-5 flex justify-between items-center text-left text-lg font-bold text-stone-900 hover:text-[#1b8af1] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <ChevronDown className={`w-5 h-5 text-stone-900 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="pb-6 text-stone-600 leading-relaxed font-medium">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

export default function JournalingPage() {
  const c = useJournalingCopy();
  // PostHog experiment `landing-hero-copy`: variant `never-open` swaps the
  // hero H1 + subheadline. Anything else (control, flag missing, flags not
  // yet loaded, bots) renders the default hero — which is also what the
  // prerendered HTML contains, so SEO snapshots stay stable. Existing CTA
  // click events carry the active flag, so they double as goal metrics.
  const heroVariant = useFeatureFlagVariantKey('landing-hero-copy');
  const heroHeadline = heroVariant === 'never-open' ? c.heroExperiment : c.hero;
  const refCode = getChannelRefCode();
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const PHONE_MAIN = '+18883663082';
  const PHONE_DISPLAY = '+1 (888) 366-3082'; // Human-readable form for prominent display
  const APP_STORE_URL = 'https://apps.apple.com/us/app/empath-ai-diary-for-your-mind/id6472873287';
  const WEB_APP_URL = 'https://www.empathdash.com/atman/'; // Placeholder; desktop now promotes text/call instead

  useEffect(() => {
    posthog.capture('journaling_page_viewed');

    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.6;
      setShowFloatingCTA(scrollPosition > heroHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAppStoreClick = () => {
    posthog.capture('journaling_page_app_store_clicked');
    // Open as a normal new tab. Passing a windowFeatures string (e.g.
    // 'noopener,noreferrer') makes browsers open a popup window instead, which
    // popup blockers reject and mobile Safari surfaces as an error page.
    const newWindow = window.open(APP_STORE_URL, '_blank');
    if (newWindow) newWindow.opener = null;
  };

  // FAQ structured data derives from the same catalog the accordion renders,
  // so translations flow into the schema automatically.
  const appFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.link ? `${item.a} ${item.link.text}.` : item.a,
      },
    })),
  };

  return (
    <div className="flex-grow bg-[#FAF9F6] text-stone-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      <SEO
        title={c.seo.title}
        description={c.seo.description}
        path="/app"
        keywords={c.seo.keywords}
        translated
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appFaqSchema) }}
      />
      <Toaster position="top-center" />

      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* --- HEADER --- */}
      <div className="bg-[#FAF9F6]/90 backdrop-blur-sm border-b-2 border-stone-200 py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-0">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logo} alt="Empath Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-stone-900 tracking-tight hidden sm:block text-lg">Empath</span>
          </Link>

          <nav className="flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-stone-600 hover:text-[#1b8af1] transition-colors hidden md:block">{c.header.features}</a>
            <a href="#how-it-works" className="text-sm font-bold text-stone-600 hover:text-[#1b8af1] transition-colors hidden md:block">{c.header.howItWorks}</a>
            <a href="#faq" className="text-sm font-bold text-stone-600 hover:text-[#1b8af1] transition-colors hidden md:block">{c.header.faq}</a>
            <Link to="/app/blog" className="text-sm font-bold text-stone-600 hover:text-[#1b8af1] transition-colors hidden md:block">{c.header.blog}</Link>
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <button
              onClick={handleAppStoreClick}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg font-bold text-sm hover:bg-[#1b8af1] transition-colors border-2 border-stone-900"
            >
              {c.header.download}
            </button>
          </nav>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <motion.section
        className="relative bg-white pt-24 pb-6 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-stone-900 mb-8 leading-[1.1] font-serif">
            {heroHeadline.h1Pre}{' '}
            <span className="relative inline-block px-3 whitespace-nowrap">
              <span className="absolute inset-0 bg-[#1b8af1] -rotate-1 rounded-sm shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]"></span>
              <span className="relative text-white">{heroHeadline.h1Highlight}</span>
            </span>
          </motion.h1>

          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            {heroHeadline.sub}
          </motion.p>

          {isMobile ? (
            <>
              {/* Mobile: messaging-first CTAs (matches "not another app" hero copy) */}
              <motion.div variants={fadeIn} className="mb-8 max-w-lg mx-auto">
                <p className="text-stone-600 font-medium mb-5 text-center">
                  {c.hero.mobileLead}
                </p>
                <div className={`grid ${SMS_ENABLED ? 'grid-cols-2' : 'grid-cols-1'} gap-3 w-full mb-3`}>
                  <a
                    href={`tel:${PHONE_MAIN}`}
                    className="px-4 py-4 bg-stone-900 text-white rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1b8af1] transition-all duration-200 font-bold flex items-center justify-center gap-2 text-sm"
                    onClick={() => posthog.capture('journaling_page_call_clicked')}
                  >
                    <Phone className="w-4 h-4" /> {c.hero.call}
                  </a>
                  {SMS_ENABLED && (
                    <a
                      href={`sms:${PHONE_MAIN}`}
                      className="px-4 py-4 bg-stone-900 text-white rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1b8af1] transition-all duration-200 font-bold flex items-center justify-center gap-2 text-sm"
                      onClick={() => posthog.capture('journaling_page_text_clicked')}
                    >
                      <MessageSquare className="w-4 h-4" /> {c.hero.text}
                    </a>
                  )}
                </div>
                <p className="text-sm text-stone-500 font-medium text-center mt-4 mb-2">{c.hero.orFavoriteApp}</p>
                <MessagingChannelsCarousel eventPrefix="journaling_page" className="mb-3" />
                <p className="text-xs text-stone-400 text-center font-medium">
                  {PHONE_DISPLAY} • {c.hero.phoneMeta}
                </p>

                <div className="relative mt-6 mb-4">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t-2 border-stone-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm font-bold text-stone-400 uppercase tracking-wider">{c.hero.wantInsights}</span>
                  </div>
                </div>
                <button
                  onClick={handleAppStoreClick}
                  className="w-full px-6 py-4 bg-white text-stone-900 rounded-xl font-bold text-sm border-2 border-stone-200 hover:border-stone-900 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                  </svg>
                  {c.hero.getApp}
                </button>
                <p className="text-xs text-stone-400 text-center mt-2 font-medium">
                  {c.hero.appBenefits}
                </p>
              </motion.div>
            </>
          ) : (
            <>
              {/* Desktop: messaging-first CTAs, web dashboard demoted to secondary */}
              <motion.div variants={fadeIn} className="mb-16 max-w-lg mx-auto">
                <p className="text-stone-600 font-medium mb-4 text-center">
                  {c.hero.desktopLead}
                </p>

                {/* Primary CTAs — call or message, the way you'd reach a friend */}
                <div className={`grid grid-cols-1 ${SMS_ENABLED ? 'sm:grid-cols-2' : ''} gap-3 w-full`}>
                  {SMS_ENABLED && (
                    <a
                      href={`sms:${PHONE_MAIN}`}
                      title={`${c.hero.textUsAt} ${PHONE_DISPLAY}`}
                      className="px-6 py-5 bg-stone-900 text-white rounded-xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1b8af1] transition-all duration-200 font-bold flex items-center justify-center gap-2.5 text-base"
                      onClick={() => posthog.capture('journaling_page_text_clicked')}
                    >
                      <MessageSquare className="w-5 h-5" /> {c.hero.textToJournal}
                    </a>
                  )}
                  <a
                    href={`tel:${PHONE_MAIN}`}
                    title={`${c.hero.callUsAt} ${PHONE_DISPLAY}`}
                    className="px-6 py-5 bg-stone-900 text-white rounded-xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1b8af1] transition-all duration-200 font-bold flex items-center justify-center gap-2.5 text-base"
                    onClick={() => posthog.capture('journaling_page_call_clicked')}
                  >
                    <Phone className="w-5 h-5" /> {c.hero.callAndTalk}
                  </a>
                </div>

                {/* Secondary channels */}
                <p className="text-sm text-stone-500 font-medium text-center mt-5 mb-3">{c.hero.orFavoriteApp}</p>
                <MessagingChannelsCarousel eventPrefix="journaling_page" />
                <p className="text-xs text-stone-400 text-center mt-3 font-medium flex items-center justify-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#1b8af1]" /> {c.hero.availability}
                </p>

                {/* Desktop can't tap tel:/wa.me — give the phone something to scan */}
                <DesktopQRCodes className="mt-6" />

                {/* Secondary: web dashboard for desktop typers */}
                <div className="relative mt-7 mb-4">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t-2 border-stone-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm font-bold text-stone-400 uppercase tracking-wider">{c.hero.preferTyping}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    posthog.capture('journaling_page_web_app_clicked');
                    window.location.href = WEB_APP_URL;
                  }}
                  className="w-full px-6 py-3.5 bg-white text-stone-900 rounded-xl font-bold text-sm border-2 border-stone-200 hover:border-stone-900 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <Brain className="w-4 h-4" /> {c.hero.openDashboard}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </motion.div>
            </>
          )}
        </div>
      </motion.section>

      {/* --- TRUST BADGES --- */}
      <section className="py-5 bg-white border-b-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-stone-700">
              <Shield className="w-5 h-5 text-[#1b8af1]" />
              <span className="font-bold text-sm">{c.trust.hipaa}</span>
            </div>
            <span className="text-stone-300">•</span>
            <div className="flex items-center gap-2 text-stone-700">
              <Brain className="w-5 h-5 text-[#1b8af1]" />
              <span className="font-bold text-sm">{c.trust.ai}</span>
            </div>
            <span className="text-stone-300">•</span>
            <div className="flex items-center gap-2 text-stone-700">
              <Star className="w-5 h-5 text-[#1b8af1]" />
              <span className="font-bold text-sm">{c.trust.loved}</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHATSAPP EXAMPLES --- */}
      <section className="py-24 bg-white border-b-2 border-stone-200 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <div className="text-center mb-16">
                <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-800 border-2 border-green-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_#25D366]">
                  <WhatsAppIcon className="w-4 h-4" /> {c.whatsappSection.badge}
                </motion.div>
                <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                  {c.whatsappSection.title}
                </motion.h2>
                <motion.p variants={fadeIn} className="text-lg text-stone-600 font-medium max-w-2xl mx-auto">
                  {c.whatsappSection.sub}
                </motion.p>
              </div>

              <motion.div variants={fadeIn}>
                <WhatsAppExamples />
              </motion.div>

              <motion.div variants={fadeIn} className="text-center mt-14">
                <a
                  href={buildChannelHref('whatsapp', c.channelRow.prefill, refCode)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => captureChannelLinkClick('journaling_page_wa_examples', 'whatsapp', refCode)}
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold text-base border-2 border-[#25D366] shadow-[6px_6px_0px_0px_#1a9e4d] hover:shadow-[4px_4px_0px_0px_#1a9e4d] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <WhatsAppIcon className="w-5 h-5" /> {c.whatsappSection.cta}
                </a>
                <p className="text-sm text-stone-500 font-medium mt-4">
                  {c.whatsappSection.phoneNote.replace('{phone}', PHONE_DISPLAY)}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CROSS-CHANNEL MEMORY --- */}
      <section className="py-24 bg-[#FAF9F6] border-b-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <div className="text-center mb-16">
                <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-800 border-2 border-blue-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_#1b8af1]">
                  <MessageCircle className="w-4 h-4" /> {c.crossChannel.badge}
                </motion.div>
                <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                  {c.crossChannel.title}
                </motion.h2>
                <motion.p variants={fadeIn} className="text-lg text-stone-600 font-medium max-w-2xl mx-auto">
                  {c.crossChannel.sub}
                </motion.p>
              </div>

              <motion.div variants={fadeIn}>
                <CrossChannelStory />
              </motion.div>

              <motion.div variants={fadeIn} className="text-center mt-14">
                <p className="text-sm text-stone-500 font-medium mb-4">
                  {c.crossChannel.pickApp}
                </p>
                <MessagingChannelsCarousel eventPrefix="journaling_page_everywhere" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- EMPATH CALLS YOU --- */}
      <section className="py-20 bg-[#FAF9F6] border-b-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-800 border-2 border-blue-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-6 shadow-[4px_4px_0px_0px_#1b8af1]">
                <PhoneCall className="w-4 h-4" /> {c.callsYou.badge}
              </motion.div>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-black text-stone-900 mb-5 tracking-tight font-serif">
                {c.callsYou.title}
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-stone-600 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                {c.callsYou.sub}
              </motion.p>
              <motion.div variants={fadeIn} className="max-w-md mx-auto bg-white p-6 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] text-left">
                <CallMeForm eventPrefix="journaling_page" source="homepage_section" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 1: CALL TO JOURNAL --- */}
      <section id="features" className="py-24 bg-[#FAF9F6] scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)]">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-800 border-2 border-purple-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-6 shadow-[4px_4px_0px_0px_#9333ea]">
                    <MessageSquare className="w-4 h-4" /> {c.feature1.badge}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                    {c.feature1.title}
                  </h2>
                  <p className="text-lg text-stone-600 mb-8 leading-relaxed font-medium">
                    {c.feature1.body}
                  </p>

                  <div className="space-y-6 mb-8">
                    {[
                      { icon: <Zap className="w-6 h-6 text-purple-600" />, chip: 'bg-purple-100 border-purple-200' },
                      { icon: <AudioWaveform className="w-6 h-6 text-blue-600" />, chip: 'bg-blue-100 border-blue-200' },
                      { icon: <ScanText className="w-6 h-6 text-green-600" />, chip: 'bg-green-100 border-green-200' },
                    ].map((visual, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${visual.chip} rounded-xl flex items-center justify-center flex-shrink-0 border-2`}>
                          {visual.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-stone-900 mb-1">{c.feature1.items[i].title}</h3>
                          <p className="text-stone-600 text-sm font-medium">{c.feature1.items[i].desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-8 border-2 border-stone-200">
                    <div className="bg-white rounded-lg p-6 mb-4 border-2 border-stone-900 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#1b8af1] rounded-full flex items-center justify-center">
                          <Mic className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-stone-900">{c.feature1.mockVoiceTitle}</p>
                          <p className="text-xs text-stone-500">{c.feature1.mockVoiceTime}</p>
                        </div>
                      </div>
                      <p className="text-stone-700 text-sm leading-relaxed italic">
                        {c.feature1.mockVoiceText}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border-2 border-stone-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Camera className="w-4 h-4 text-blue-600" />
                        <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">{c.feature1.mockPhotoLabel}</p>
                      </div>
                      <div className="bg-stone-100 rounded h-32 mb-2 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-stone-300" />
                      </div>
                      <p className="text-xs text-stone-600 font-medium">{c.feature1.mockPhotoCaption}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 2: MEMORIES & INSIGHTS --- */}
      <section className="py-24 bg-white border-y-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-800 border-2 border-amber-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_#f59e0b]">
                <Sparkles className="w-4 h-4" /> {c.feature2.badge}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                {c.feature2.title}
              </h2>
              <p className="text-lg text-stone-600 font-medium max-w-2xl mx-auto">
                {c.feature2.sub}
              </p>
            </div>

            {/* 2-up at md (three p-8 cards get cramped at 768px), 3-up from lg. */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#FAF9F6] p-8 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] hover:shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6 border-2 border-amber-200">
                  <Brain className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">{c.feature2.memoryTitle}</h3>
                <p className="text-stone-600 mb-6 leading-relaxed font-medium">
                  {c.feature2.memoryBody}
                </p>
                <ul className="space-y-3">
                  {c.feature2.memoryItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-stone-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAF9F6] p-8 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] hover:shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 border-2 border-purple-200">
                  <Sparkles className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">{c.feature2.patternsTitle}</h3>
                <p className="text-stone-600 mb-6 leading-relaxed font-medium">
                  {c.feature2.patternsBody}
                </p>
                <ul className="space-y-3">
                  {c.feature2.patternsItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-stone-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAF9F6] p-8 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] hover:shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 border-2 border-blue-200">
                  <Users className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">{c.feature2.peopleTitle}</h3>
                <p className="text-stone-600 mb-6 leading-relaxed font-medium">
                  {c.feature2.peopleBody}
                </p>
                <ul className="space-y-3">
                  {c.feature2.peopleItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-stone-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 3: MOOD TRENDS --- */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 md:p-12 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)]">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="bg-white rounded-xl p-6 border-2 border-stone-900 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-bold text-stone-900">{c.feature3.mockTitle}</h4>
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{c.feature3.mockRange}</span>
                    </div>

                    {/* Simple visual representation */}
                    <div className="space-y-3 mb-6">
                      {[
                        { value: 85, color: 'bg-green-500' },
                        { value: 70, color: 'bg-blue-500' },
                        { value: 45, color: 'bg-yellow-500' },
                        { value: 20, color: 'bg-purple-500' }
                      ].map((mood, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-stone-600">{c.feature3.moods[i].label}</span>
                            <span className="text-xs font-bold text-stone-900">{mood.value}%</span>
                          </div>
                          <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${mood.color} rounded-full transition-all duration-500`}
                              style={{ width: `${mood.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">{c.feature3.insightLabel}</span>
                      </div>
                      <p className="text-sm text-blue-800 font-medium">
                        {c.feature3.insightText}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-800 border-2 border-blue-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-6 shadow-[4px_4px_0px_0px_#1b8af1]">
                    <BarChart3 className="w-4 h-4" /> {c.feature3.badge}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                    {c.feature3.title}
                  </h2>
                  <p className="text-lg text-stone-600 mb-8 leading-relaxed font-medium">
                    {c.feature3.body}
                  </p>

                  <div className="space-y-4 mb-8">
                    {c.feature3.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-stone-900">{item.title}</p>
                          <p className="text-sm text-stone-600 font-medium">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 4: HEALTH TRACKING --- */}
      <section className="py-24 bg-white border-y-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-800 border-2 border-green-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_#10b981]">
                <Heart className="w-4 h-4" /> {c.feature4.badge}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                {c.feature4.title}
              </h2>
              <p className="text-lg text-stone-600 font-medium max-w-2xl mx-auto">
                {c.feature4.sub}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Activity className="w-7 h-7 text-red-600" />,
                  // Tailwind's JIT only generates classes it can see as literal
                  // strings, so these must not be built from `${color}` templates.
                  chipClass: 'bg-red-100 border-red-200',
                },
                {
                  icon: <Heart className="w-7 h-7 text-pink-600" />,
                  chipClass: 'bg-pink-100 border-pink-200',
                },
                {
                  icon: <Calendar className="w-7 h-7 text-purple-600" />,
                  chipClass: 'bg-purple-100 border-purple-200',
                }
              ].map((visual, i) => (
                <div key={i} className="bg-[#FAF9F6] p-8 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] hover:shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <div className={`w-14 h-14 ${visual.chipClass} rounded-xl flex items-center justify-center mb-6 border-2`}>
                    {visual.icon}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{c.feature4.cards[i].title}</h3>
                  <p className="text-stone-600 mb-6 font-medium">{c.feature4.cards[i].desc}</p>
                  <div className="space-y-2">
                    {c.feature4.cards[i].metrics.map((metric, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-stone-900 rounded-full" />
                        <span className="text-sm text-stone-700 font-medium">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-stone-900">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 border-2 border-stone-900">
                  <Zap className="w-6 h-6 text-[#1b8af1]" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg mb-2">{c.feature4.calloutTitle}</h3>
                  <p className="text-stone-600 font-medium">
                    {c.feature4.calloutBody}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 5: AI ASSISTANT --- */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1b8af1] text-white border-2 border-white rounded-lg text-xs font-bold uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
                <Brain className="w-4 h-4" /> {c.feature5.badge}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight font-serif">
                {c.feature5.title}
              </h2>
              <p className="text-lg text-stone-300 font-medium max-w-2xl mx-auto">
                {c.feature5.sub}
              </p>
            </div>

            <div className="bg-[#FAF9F6] rounded-xl p-8 md:p-12 border-2 border-white shadow-[8px_8px_0px_0px_#1b8af1]">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-6">{c.feature5.companionTitle}</h3>

                  <div className="space-y-6">
                    {c.feature5.exchanges.map((exchange, i) => (
                      <div key={i} className="bg-white p-4 rounded-lg border-2 border-stone-200 shadow-sm">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <MessageCircle className="w-4 h-4 text-blue-600" />
                          </div>
                          <p className="text-stone-700 font-medium text-sm italic">
                            {exchange.q}
                          </p>
                        </div>
                        <div className="flex items-start gap-3 pl-11">
                          <div className="w-8 h-8 bg-[#1b8af1] rounded-full flex items-center justify-center flex-shrink-0">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-stone-900 font-medium text-sm">
                            {exchange.a}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-stone-900 text-lg mb-3">{c.feature5.askTitle}</h4>
                      <ul className="space-y-3">
                        {c.feature5.askItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" />
                            <span className="text-stone-700 font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                      <Lock className="w-6 h-6 text-blue-600 mb-3" />
                      <p className="text-sm text-blue-900 font-bold mb-2">{c.feature5.privacyTitle}</p>
                      <p className="text-sm text-blue-800 font-medium">
                        {c.feature5.privacyBody}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID: EVERYTHING ELSE --- */}
      {/* Closes the #features region: the shipped features that don't warrant a
          section of their own. Icons are index-matched to
          `featureGrid.items` in the copy catalog — reorder both together. */}
      <section className="py-24 bg-white border-b-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100 text-stone-800 border-2 border-stone-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
                <LayoutGrid className="w-4 h-4" /> {c.featureGrid.badge}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                {c.featureGrid.title}
              </h2>
              <p className="text-lg text-stone-600 font-medium max-w-2xl mx-auto">
                {c.featureGrid.sub}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                // Tailwind's JIT only sees literal class strings, so the chip
                // colours can't be built from a `${color}` template.
                { icon: <ScanFace className="w-6 h-6 text-purple-600" />, chip: 'bg-purple-100 border-purple-200' },
                { icon: <PenSquare className="w-6 h-6 text-[#1b8af1]" />, chip: 'bg-blue-100 border-blue-200' },
                { icon: <Lightbulb className="w-6 h-6 text-amber-600" />, chip: 'bg-amber-100 border-amber-200' },
                { icon: <LayoutGrid className="w-6 h-6 text-green-600" />, chip: 'bg-green-100 border-green-200' },
                { icon: <UserSquare className="w-6 h-6 text-pink-600" />, chip: 'bg-pink-100 border-pink-200' },
                { icon: <SquareStack className="w-6 h-6 text-amber-600" />, chip: 'bg-amber-100 border-amber-200' },
                { icon: <Upload className="w-6 h-6 text-[#1b8af1]" />, chip: 'bg-blue-100 border-blue-200' },
                { icon: <WifiOff className="w-6 h-6 text-stone-600" />, chip: 'bg-stone-100 border-stone-200' },
              ].map((visual, i) => (
                <div
                  key={i}
                  className="bg-[#FAF9F6] p-6 rounded-xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] hover:shadow-[4px_4px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <div className={`w-12 h-12 ${visual.chip} rounded-xl flex items-center justify-center mb-4 border-2`}>
                    {visual.icon}
                  </div>
                  <h3 className="font-bold text-stone-900 mb-2">{c.featureGrid.items[i].title}</h3>
                  <p className="text-sm text-stone-600 font-medium leading-relaxed">
                    {c.featureGrid.items[i].desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 6: THERAPIST CONNECTION --- */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-800 border-2 border-purple-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_#9333ea]">
                <Sparkles className="w-4 h-4" /> {c.feature6.badge}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                {c.feature6.title}
              </h2>
              <p className="text-lg text-stone-600 font-medium max-w-2xl mx-auto">
                {c.feature6.sub}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 md:p-12 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] mb-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-stone-900 mb-6">{c.feature6.cardTitle}</h3>
                  <p className="text-stone-600 mb-8 leading-relaxed font-medium text-lg">
                    {c.feature6.cardBody}
                  </p>

                  <div className="space-y-6">
                    {[
                      { icon: <FileText className="w-6 h-6 text-purple-600" />, chip: 'bg-purple-100 border-purple-200' },
                      { icon: <Brain className="w-6 h-6 text-blue-600" />, chip: 'bg-blue-100 border-blue-200' },
                      { icon: <Zap className="w-6 h-6 text-green-600" />, chip: 'bg-green-100 border-green-200' },
                    ].map((visual, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${visual.chip} rounded-xl flex items-center justify-center flex-shrink-0 border-2`}>
                          {visual.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900 mb-1">{c.feature6.items[i].title}</h4>
                          <p className="text-stone-600 text-sm font-medium">
                            {c.feature6.items[i].desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-xl p-6 border-2 border-stone-900 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">{c.feature6.mockTitle}</p>
                        <p className="text-xs text-stone-500">{c.feature6.mockSub}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-stone-50 rounded p-4 border border-stone-200">
                        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{c.feature6.mockMoodLabel}</p>
                        <p className="text-sm text-stone-700 font-medium">
                          {c.feature6.mockMoodText}
                        </p>
                      </div>

                      <div className="bg-stone-50 rounded p-4 border border-stone-200">
                        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{c.feature6.mockMomentsLabel}</p>
                        <ul className="space-y-2">
                          {c.feature6.mockMoments.map((moment, i) => (
                            <li key={i} className="text-sm text-stone-700 font-medium flex items-start gap-2">
                              <span className="text-blue-600">•</span>
                              {moment}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-50 rounded p-4 border-2 border-blue-200">
                        <p className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">{c.feature6.mockFocusLabel}</p>
                        <p className="text-sm text-blue-800 font-medium">
                          {c.feature6.mockFocusText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-stone-900 text-center">
              <h3 className="text-xl font-bold text-stone-900 mb-3">{c.feature6.privacyTitle}</h3>
              <p className="text-stone-600 mb-6 max-w-2xl mx-auto font-medium">
                {c.feature6.privacyBody}
              </p>
              <div className="flex justify-center gap-6 flex-wrap">
                {c.feature6.privacyBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-stone-700">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24 bg-white border-y-2 border-stone-200 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                {c.howItWorks.title}
              </h2>
              <p className="text-lg text-stone-600 font-medium">
                {c.howItWorks.sub}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                <MessageSquare key="1" className="w-8 h-8 text-white" />,
                <Sparkles key="2" className="w-8 h-8 text-white" />,
                <BarChart3 key="3" className="w-8 h-8 text-white" />,
              ].map((icon, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-stone-900 rounded-xl flex items-center justify-center mx-auto mb-6 border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1]">
                    {icon}
                  </div>
                  <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-wider rounded mb-4">
                    {c.howItWorks.stepLabel} 0{i + 1}
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{c.howItWorks.steps[i].title}</h3>
                  <p className="text-stone-600 font-medium">{c.howItWorks.steps[i].desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- IOS APP CALL-OUT --- */}
      <section className="py-12 bg-white border-y-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="bg-stone-900 text-white rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_#1b8af1] p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">{c.iosCallout.kicker}</p>
              <h3 className="text-2xl md:text-3xl font-black mb-2">{c.iosCallout.title}</h3>
              <p className="text-stone-200 font-medium max-w-xl">{c.iosCallout.body}</p>
            </div>
            <button
              onClick={handleAppStoreClick}
              className="inline-flex items-center gap-3 px-6 py-4 bg-white text-stone-900 rounded-xl font-bold text-base border-2 border-white shadow-[6px_6px_0px_0px_#1b8af1] hover:shadow-[4px_4px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
              </svg>
              {c.iosCallout.button}
            </button>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-stone-900 mb-4 font-serif">{c.socialProof.title}</h2>
            <div className="flex justify-center gap-1 text-[#1b8af1] mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <p className="text-stone-500 font-medium uppercase tracking-wide text-sm">{c.socialProof.featured}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {c.socialProof.testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] hover:shadow-[4px_4px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex flex-col"
              >
                <div className="flex gap-0.5 text-[#1b8af1] mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-stone-700 mb-6 leading-relaxed font-serif text-lg italic flex-grow">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-stone-900">{t.author}</p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-24 bg-white border-t-2 border-stone-200 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black text-center text-stone-900 mb-12 font-serif">{c.faq.title}</h2>
          <div className="space-y-4">
            {c.faq.items.map((item, i) => (
              <FAQItem
                key={i}
                question={item.q}
                answer={
                  item.link ? (
                    <>
                      {item.a}{' '}
                      <Link to={item.link.to} className="text-[#1b8af1] hover:underline font-bold">{item.link.text}</Link>.
                    </>
                  ) : (
                    item.a
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight font-serif">
              {c.finalCta.title}
            </h2>
            <p className="text-xl text-stone-300 mb-12 leading-relaxed font-medium">
              {c.finalCta.sub}
            </p>

            {isMobile ? (
              <button
                onClick={handleAppStoreClick}
                className="inline-flex items-center gap-3 px-8 py-5 bg-white text-stone-900 rounded-xl font-bold text-lg border-2 border-white shadow-[6px_6px_0px_0px_#1b8af1] hover:shadow-[4px_4px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all mb-6"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                {c.finalCta.downloadFree}
              </button>
            ) : (
              <div className="inline-flex flex-col items-center gap-4 px-8 py-7 bg-white text-stone-900 rounded-xl border-2 border-white shadow-[6px_6px_0px_0px_#1b8af1] mb-6 w-full max-w-xl">
                <p className="text-sm font-bold uppercase tracking-wider text-stone-500">{c.finalCta.justSayHi}</p>
                <div className={`grid grid-cols-1 ${SMS_ENABLED ? 'sm:grid-cols-2' : ''} gap-3 w-full`}>
                  {SMS_ENABLED && (
                    <a
                      href={`sms:${PHONE_MAIN}`}
                      title={`${c.hero.textUsAt} ${PHONE_DISPLAY}`}
                      className="px-5 py-4 bg-stone-900 text-white rounded-xl font-bold border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1] hover:shadow-[2px_2px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                      onClick={() => posthog.capture('final_cta_text_clicked')}
                    >
                      <MessageSquare className="w-5 h-5" /> {c.hero.textToJournal}
                    </a>
                  )}
                  <a
                    href={`tel:${PHONE_MAIN}`}
                    title={`${c.hero.callUsAt} ${PHONE_DISPLAY}`}
                    className="px-5 py-4 bg-stone-900 text-white rounded-xl font-bold border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1] hover:shadow-[2px_2px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                    onClick={() => posthog.capture('final_cta_call_clicked')}
                  >
                    <Phone className="w-5 h-5" /> {c.hero.callAndTalk}
                  </a>
                </div>
                <button
                  onClick={() => {
                    posthog.capture('final_cta_web_app_clicked');
                    window.location.href = WEB_APP_URL;
                  }}
                  className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Brain className="w-4 h-4" /> {c.finalCta.preferTyping}
                </button>
              </div>
            )}

            <div className="flex justify-center gap-8 flex-wrap text-sm text-stone-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                {c.finalCta.noCreditCard}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                {c.finalCta.freeForever}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                {c.finalCta.fastSetup}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#FAF9F6] border-t-2 border-stone-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block p-4 rounded-lg mb-8">
            <img src={logo} alt="Empath" className="w-8 h-8 object-contain" />
          </div>
          <div className="flex justify-center items-center gap-8 text-stone-500 font-bold text-sm mb-8 uppercase tracking-widest flex-wrap">
            <Link to="/privacy" className="hover:text-stone-900 transition-colors">{c.footer.privacy}</Link>
            <Link to="/terms" className="hover:text-stone-900 transition-colors">{c.footer.terms}</Link>
            <button
              type="button"
              onClick={() => openSupportChat()}
              className="hover:text-stone-900 transition-colors uppercase tracking-widest font-bold"
            >
              {c.footer.support}
            </button>
            <LanguageSwitcher />
          </div>
          <p className="text-stone-400 text-xs font-medium">© {new Date().getFullYear()} Reality Articulated Inc.</p>
        </div>
      </footer>

      {/* --- FLOATING CTA --- */}
      {/* Desktop only. The mobile sticky bottom bar was removed deliberately —
          it covered content while scrolling; mobile keeps the in-page CTAs. */}
      {showFloatingCTA && !isMobile && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 bg-[#FAF9F6]/90 backdrop-blur-md border-b-2 border-stone-200 p-4 z-50 shadow-sm"
        >
          <div className="flex items-center gap-0 container mx-auto px-4">
            <Link to="/" className="flex items-center gap-0">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src={logo} alt="Empath Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-stone-900 text-lg">Empath</span>
            </Link>
            <div className="flex-grow"></div>
            <div className="flex items-center gap-3">
              {/* With SMS paused, the call CTA is the primary action and stops being lg-only. */}
              <a
                href={`tel:${PHONE_MAIN}`}
                title={`${c.hero.callUsAt} ${PHONE_DISPLAY}`}
                className={
                  SMS_ENABLED
                    ? 'px-5 py-2 bg-white text-stone-900 rounded-lg font-bold border-2 border-stone-900 hover:bg-stone-100 transition items-center gap-2 hidden lg:flex'
                    : 'px-6 py-2 bg-stone-900 text-white rounded-lg font-bold shadow hover:bg-[#1b8af1] transition border-2 border-stone-900 flex items-center gap-2'
                }
                onClick={() => posthog.capture('floating_cta_call_clicked')}
              >
                <Phone className="w-4 h-4" /> {c.floating.call}
              </a>
              {SMS_ENABLED && (
                <a
                  href={`sms:${PHONE_MAIN}`}
                  title={`${c.hero.textUsAt} ${PHONE_DISPLAY}`}
                  className="px-6 py-2 bg-stone-900 text-white rounded-lg font-bold shadow hover:bg-[#1b8af1] transition border-2 border-stone-900 flex items-center gap-2"
                  onClick={() => posthog.capture('floating_cta_text_clicked')}
                >
                  <MessageSquare className="w-4 h-4" /> {c.floating.text}
                </a>
              )}
              <button
                onClick={() => {
                  posthog.capture('floating_cta_web_app_clicked');
                  window.location.href = WEB_APP_URL;
                }}
                className="px-4 py-2 text-stone-500 hover:text-stone-900 font-bold transition-colors hidden md:flex items-center gap-1.5 text-sm"
              >
                <Brain className="w-4 h-4" /> {c.floating.webApp}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
