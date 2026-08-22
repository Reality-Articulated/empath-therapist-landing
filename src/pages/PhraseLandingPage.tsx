import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageSquare,
  MessageCircle,
  CheckCircle,
  Shield,
  Brain,
  Star,
  Lock,
  Zap,
  PenSquare,
  Heart,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import posthog from 'posthog-js';
import SEO from '../components/SEO';
import FAQItem from '../components/FAQItem';
import WhatsAppExamples from '../components/WhatsAppExamples';
import CrossChannelStory from '../components/CrossChannelStory';
import TryEmpathDemo from '../components/TryEmpathDemo';
import MessagingChannelsCarousel from '../components/MessagingChannelsCarousel';
import { WhatsAppIcon } from '../components/ChannelIcons';
import logo from '../../public/empath-logo.png';
import { useJournalingCopy } from '../i18n/copy';
import { SMS_ENABLED } from '../utils/channels';
import { buildChannelHref, captureChannelLinkClick, getChannelRefCode } from '../utils/attribution';
import type { PhrasePageEntry } from '../data/phrasePages';

const PHONE_MAIN = '+18883663082';
const PHONE_DISPLAY = '+1 (888) 366-3082';
const APP_STORE_URL = 'https://apps.apple.com/us/app/empath-ai-diary-for-your-mind/id6472873287';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// Index-matched to a fixed 4-item slice of the (locale-aware) worries copy —
// same visual treatment as JournalingPage's worries grid, reused here so
// these SEO landing pages carry the same trust-building content instead of
// duplicating it. See JournalingPage.tsx for the canonical version.
const WORRY_VISUALS = [
  { icon: <Lock className="w-5 h-5 text-[#1b8af1]" />, chip: 'bg-blue-100 border-blue-200' },
  { icon: <Zap className="w-5 h-5 text-green-600" />, chip: 'bg-green-100 border-green-200' },
  { icon: <PenSquare className="w-5 h-5 text-purple-600" />, chip: 'bg-purple-100 border-purple-200' },
  { icon: <Heart className="w-5 h-5 text-pink-600" />, chip: 'bg-pink-100 border-pink-200' },
];

export default function PhraseLandingPage({ entry }: { entry: PhrasePageEntry }) {
  const c = useJournalingCopy();
  const refCode = getChannelRefCode();

  useEffect(() => {
    posthog.capture('phrase_page_viewed', { slug: entry.slug });
  }, [entry.slug]);

  const handleAppStoreClick = () => {
    posthog.capture('journaling_page_app_store_clicked', { source: `phrase_page_${entry.slug}` });
    const newWindow = window.open(APP_STORE_URL, '_blank');
    if (newWindow) newWindow.opener = null;
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div className="flex-grow bg-[#FAF9F6] text-stone-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      <SEO title={entry.seoTitle} description={entry.seoDescription} path={`/${entry.slug}`} keywords={entry.seoKeywords} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Minimal chrome (page is in the hideNavbar list) */}
      <header className="max-w-5xl w-full mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Empath" className="w-8 h-8" />
          <span className="font-bold text-lg">Empath</span>
        </Link>
        <Link to="/" className="text-sm font-medium text-stone-500 hover:text-[#1b8af1] transition-colors">
          empathdash.com
        </Link>
      </header>

      {/* --- HERO --- */}
      <motion.section
        className="relative bg-white pt-8 pb-6 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <motion.h1
            variants={fadeIn}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-stone-900 mb-6 leading-[1.1] font-serif"
          >
            {entry.h1Pre}{' '}
            <span className="relative inline-block px-3 whitespace-nowrap">
              <span className="absolute inset-0 bg-[#1b8af1] -rotate-1 rounded-sm shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]"></span>
              <span className="relative text-white">{entry.h1Highlight}</span>
            </span>
          </motion.h1>

          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-stone-600 mb-6 leading-relaxed font-medium">
            {entry.sub}
          </motion.p>

          <motion.p variants={fadeIn} className="text-base text-stone-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            {entry.intro}
          </motion.p>

          <motion.div variants={fadeIn} className="mb-4 max-w-lg mx-auto">
            <div className={`grid ${SMS_ENABLED ? 'sm:grid-cols-2' : ''} grid-cols-1 gap-3 w-full mb-3`}>
              {SMS_ENABLED && (
                <a
                  href={`sms:${PHONE_MAIN}`}
                  className="px-4 py-4 bg-stone-900 text-white rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1b8af1] transition-all duration-200 font-bold flex items-center justify-center gap-2 text-sm"
                  onClick={() => posthog.capture('journaling_page_text_clicked', { source: `phrase_page_${entry.slug}` })}
                >
                  <MessageSquare className="w-4 h-4" /> {c.hero.text}
                </a>
              )}
              <a
                href={`tel:${PHONE_MAIN}`}
                className="px-4 py-4 bg-stone-900 text-white rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1b8af1] transition-all duration-200 font-bold flex items-center justify-center gap-2 text-sm"
                onClick={() => posthog.capture('journaling_page_call_clicked', { source: `phrase_page_${entry.slug}` })}
              >
                <Phone className="w-4 h-4" /> {c.hero.call}
              </a>
            </div>
            <p className="text-sm text-stone-500 font-medium text-center mt-4 mb-2">{c.hero.orFavoriteApp}</p>
            <MessagingChannelsCarousel eventPrefix={`phrase_page_${entry.slug}`} className="mb-3" />
            <p className="text-xs text-stone-400 text-center font-medium mb-6">
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
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              {c.hero.getApp}
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* --- TRUST BADGES --- */}
      <section className="py-5 bg-white border-t-2 border-b-2 border-stone-200">
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

      {/* --- INTERACTIVE DEMO --- */}
      <section className="py-20 bg-[#FAF9F6] border-b-2 border-stone-200 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <div className="text-center mb-10">
                <motion.h2 variants={fadeIn} className="text-2xl md:text-4xl font-black text-stone-900 mb-4 tracking-tight font-serif">
                  {c.tryIt.title}
                </motion.h2>
                <motion.p variants={fadeIn} className="text-lg text-stone-600 font-medium">
                  {c.tryIt.sub}
                </motion.p>
              </div>
              <motion.div variants={fadeIn}>
                <TryEmpathDemo />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- WHATSAPP EXAMPLES --- */}
      <section className="py-20 bg-white border-b-2 border-stone-200 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <div className="text-center mb-14">
                <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-800 border-2 border-green-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-6 shadow-[4px_4px_0px_0px_#25D366]">
                  <WhatsAppIcon className="w-4 h-4" /> {c.whatsappSection.badge}
                </motion.div>
                <motion.h2 variants={fadeIn} className="text-2xl md:text-4xl font-black text-stone-900 mb-4 tracking-tight font-serif">
                  {c.whatsappSection.title}
                </motion.h2>
                <motion.p variants={fadeIn} className="text-lg text-stone-600 font-medium max-w-2xl mx-auto">
                  {c.whatsappSection.sub}
                </motion.p>
              </div>
              <motion.div variants={fadeIn}>
                <WhatsAppExamples />
              </motion.div>
              <motion.div variants={fadeIn} className="text-center mt-12">
                <a
                  href={buildChannelHref('whatsapp', c.channelRow.prefill, refCode)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => captureChannelLinkClick(`phrase_page_${entry.slug}`, 'whatsapp', refCode)}
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold text-base border-2 border-[#25D366] shadow-[6px_6px_0px_0px_#1a9e4d] hover:shadow-[4px_4px_0px_0px_#1a9e4d] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <WhatsAppIcon className="w-5 h-5" /> {c.whatsappSection.cta}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CROSS-CHANNEL STORY --- */}
      <section className="py-20 bg-[#FAF9F6] border-b-2 border-stone-200 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <CrossChannelStory />
          </div>
        </div>
      </section>

      {/* --- WORRIES / OBJECTION HANDLING --- */}
      <section className="py-20 bg-white border-b-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-800 border-2 border-blue-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-6 shadow-[4px_4px_0px_0px_#1b8af1]">
                <MessageCircle className="w-4 h-4" /> {c.worries.badge}
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-stone-900 mb-4 tracking-tight font-serif">{c.worries.title}</h2>
              <p className="text-lg text-stone-600 font-medium max-w-2xl mx-auto">{c.worries.sub}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {WORRY_VISUALS.map((visual, i) => (
                <div
                  key={i}
                  className="bg-[#FAF9F6] p-8 rounded-xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] hover:shadow-[4px_4px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <div className="inline-block bg-white border-2 border-stone-200 rounded-xl rounded-tl-sm px-4 py-3 mb-6">
                    <p className="text-stone-700 font-medium italic">{c.worries.items[i].worry}</p>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${visual.chip} rounded-lg flex items-center justify-center border-2 flex-shrink-0`}>
                      {visual.icon}
                    </div>
                    <h3 className="text-xl font-bold text-stone-900">{c.worries.items[i].title}</h3>
                  </div>
                  <p className="text-stone-600 font-medium leading-relaxed">{c.worries.items[i].body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-20 bg-white border-b-2 border-stone-200">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-black text-center text-stone-900 mb-10 font-serif">{c.faq.title}</h2>
          <div className="space-y-4">
            {c.faq.items.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight font-serif">{c.finalCta.title}</h2>
            <p className="text-xl text-stone-300 mb-10 leading-relaxed font-medium">{c.finalCta.sub}</p>
            <button
              onClick={handleAppStoreClick}
              className="inline-flex items-center gap-3 px-8 py-5 bg-white text-stone-900 rounded-xl font-bold text-lg border-2 border-white shadow-[6px_6px_0px_0px_#1b8af1] hover:shadow-[4px_4px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all mb-8"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              {c.finalCta.downloadFree}
            </button>
            <div className="flex justify-center gap-8 flex-wrap text-sm text-stone-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" /> {c.finalCta.noCreditCard}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" /> {c.finalCta.freeForever}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" /> {c.finalCta.fastSetup}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#FAF9F6] border-t-2 border-stone-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block p-4 rounded-lg mb-6">
            <img src={logo} alt="Empath" className="w-8 h-8 object-contain" />
          </div>
          <div className="flex justify-center items-center gap-8 text-stone-500 font-bold text-sm mb-6 uppercase tracking-widest flex-wrap">
            <Link to="/privacy" className="hover:text-stone-900 transition-colors">{c.footer.privacy}</Link>
            <Link to="/terms" className="hover:text-stone-900 transition-colors">{c.footer.terms}</Link>
          </div>
          <p className="text-stone-400 text-xs font-medium">© {new Date().getFullYear()} Reality Articulated Inc.</p>
        </div>
      </footer>
    </div>
  );
}
