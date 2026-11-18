import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageSquare,
  Check,
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
import { WhatsAppIcon, AppleIcon } from '../components/ChannelIcons';
import logo from '../../public/empath-logo.png';
import { useJournalingCopy } from '../i18n/copy';
import { SMS_ENABLED } from '../utils/channels';
import { useIsUSVisitor } from '../utils/geo';
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

// Shared type styles, matching the home page (JournalingPage.tsx).
const EYEBROW = 'text-xs font-semibold uppercase tracking-[0.18em] text-[#1b8af1]';
const H2 = 'font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.12] text-stone-900';
const LEAD = 'text-lg text-stone-600 leading-relaxed';

// Index-matched to a fixed 4-item slice of the worries copy. The home page
// no longer renders a worries section, so these SEO landing pages are where
// that trust-building content lives.
const WORRY_ICONS = [Lock, Zap, PenSquare, Heart];

export default function PhraseLandingPage({ entry }: { entry: PhrasePageEntry }) {
  const c = useJournalingCopy();
  const refCode = getChannelRefCode();
  const isUS = useIsUSVisitor();

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
    <div className="flex-grow bg-[#FAF9F6] text-stone-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <SEO title={entry.seoTitle} description={entry.seoDescription} path={`/${entry.slug}`} keywords={entry.seoKeywords} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Minimal chrome (page is in the hideNavbar list) */}
      <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-[#FAF9F6]/85 backdrop-blur-md">
        <div className="max-w-5xl w-full mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-0">
            <img src={logo} alt="Empath" className="w-10 h-10 object-contain" />
            <span className="text-lg tracking-tight text-stone-900">Empath</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
            empathdash.com
          </Link>
        </div>
      </header>

      {/* --- HERO --- */}
      <motion.section
        className="relative bg-white pt-16 md:pt-24 pb-16 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <motion.h1
            variants={fadeIn}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-stone-900 mb-7 leading-[1.08]"
          >
            {entry.h1Pre}{' '}
            <span className="italic text-[#1b8af1]">{entry.h1Highlight}</span>
          </motion.h1>

          <motion.p variants={fadeIn} className="text-lg md:text-xl text-stone-600 mb-6 leading-relaxed">
            {entry.sub}
          </motion.p>

          <motion.p variants={fadeIn} className="text-base text-stone-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            {entry.intro}
          </motion.p>

          <motion.div variants={fadeIn} className="mb-4 max-w-lg mx-auto">
            <div
              className={`grid ${
                SMS_ENABLED ? (isUS ? 'grid-cols-3' : 'grid-cols-2') : isUS ? 'grid-cols-2' : 'grid-cols-1'
              } gap-3 w-full mb-3`}
            >
              <a
                href={buildChannelHref('whatsapp', c.channelRow.prefill, refCode)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 bg-stone-900 text-white rounded-full hover:bg-[#1b8af1] transition-colors duration-200 font-semibold flex items-center justify-center gap-2 text-sm"
                onClick={() => captureChannelLinkClick(`phrase_page_${entry.slug}`, 'whatsapp', refCode)}
              >
                <WhatsAppIcon className="w-4 h-4" /> {c.whatsappSection.cta}
              </a>
              {SMS_ENABLED && (
                <a
                  href={`sms:${PHONE_MAIN}`}
                  className="px-4 py-3.5 bg-stone-900 text-white rounded-full hover:bg-[#1b8af1] transition-colors duration-200 font-semibold flex items-center justify-center gap-2 text-sm"
                  onClick={() => posthog.capture('journaling_page_text_clicked', { source: `phrase_page_${entry.slug}` })}
                >
                  <MessageSquare className="w-4 h-4" /> {c.hero.text}
                </a>
              )}
              {isUS && (
                <a
                  href={`tel:${PHONE_MAIN}`}
                  className="px-4 py-3.5 bg-white text-stone-900 rounded-full border border-stone-300 hover:border-stone-900 transition-colors duration-200 font-semibold flex items-center justify-center gap-2 text-sm"
                  onClick={() => posthog.capture('journaling_page_call_clicked', { source: `phrase_page_${entry.slug}` })}
                >
                  <Phone className="w-4 h-4" /> {c.hero.call}
                </a>
              )}
            </div>
            <p className="text-sm text-stone-500 text-center mt-5 mb-3">{c.hero.orFavoriteApp}</p>
            <MessagingChannelsCarousel eventPrefix={`phrase_page_${entry.slug}`} className="mb-3" />
            <p className="text-xs text-stone-400 text-center mb-6">
              {PHONE_DISPLAY} • {c.hero.phoneMeta}
            </p>

            <div className="relative mt-6 mb-4">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-stone-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs font-semibold text-stone-400 uppercase tracking-[0.14em]">{c.hero.wantInsights}</span>
              </div>
            </div>
            <button
              onClick={handleAppStoreClick}
              className="w-full px-6 py-3.5 bg-white text-stone-900 rounded-full font-semibold text-sm border border-stone-300 hover:border-stone-900 transition-colors duration-200 flex items-center justify-center gap-3"
            >
              <AppleIcon className="w-5 h-5" />
              {c.hero.getApp}
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* --- TRUST BADGES --- */}
      <section className="py-5 bg-white border-y border-stone-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-x-8 gap-y-2 flex-wrap text-sm text-stone-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#1b8af1]" />
              <span>{c.trust.privacy}</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#1b8af1]" />
              <span>{c.trust.ai}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#1b8af1]" />
              <span>{c.trust.loved}</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE DEMO --- */}
      <section className="py-20 md:py-24 bg-[#FAF9F6] border-b border-stone-200 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <div className="text-center mb-10">
                <motion.p variants={fadeIn} className={EYEBROW}>
                  {c.tryIt.badge}
                </motion.p>
                <motion.h2 variants={fadeIn} className={`${H2} mt-4 mb-4`}>
                  {c.tryIt.title}
                </motion.h2>
                <motion.p variants={fadeIn} className={LEAD}>
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
      <section className="py-20 md:py-24 bg-white border-b border-stone-200 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <div className="text-center mb-14">
                <motion.p variants={fadeIn} className={EYEBROW}>
                  {c.whatsappSection.badge}
                </motion.p>
                <motion.h2 variants={fadeIn} className={`${H2} mt-4 mb-4`}>
                  {c.whatsappSection.title}
                </motion.h2>
                <motion.p variants={fadeIn} className={`${LEAD} max-w-2xl mx-auto`}>
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
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] text-white rounded-full font-semibold text-base hover:bg-[#1fb857] transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5" /> {c.whatsappSection.cta}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CROSS-CHANNEL STORY --- */}
      <section className="py-20 md:py-24 bg-[#FAF9F6] border-b border-stone-200 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <CrossChannelStory />
          </div>
        </div>
      </section>

      {/* --- WORRIES / OBJECTION HANDLING --- */}
      <section className="py-20 md:py-24 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className={EYEBROW}>{c.worries.badge}</p>
              <h2 className={`${H2} mt-4 mb-4`}>{c.worries.title}</h2>
              <p className={`${LEAD} max-w-2xl mx-auto`}>{c.worries.sub}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {WORRY_ICONS.map((WorryIcon, i) => (
                <div key={i} className="bg-[#FAF9F6] p-8 rounded-3xl border border-stone-200">
                  <div className="inline-block bg-white border border-stone-200 rounded-2xl rounded-tl-sm px-4 py-3 mb-6">
                    <p className="text-stone-700 italic">{c.worries.items[i].worry}</p>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <WorryIcon className="w-5 h-5 text-[#1b8af1]" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-semibold text-stone-900">{c.worries.items[i].title}</h3>
                  </div>
                  <p className="text-stone-600 leading-relaxed">{c.worries.items[i].body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className={`${H2} text-center mb-10`}>{c.faq.title}</h2>
          <div>
            {c.faq.items.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="bg-white px-4 pb-24">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto rounded-[2rem] bg-stone-900 px-6 py-16 text-center text-white md:px-16 md:py-20">
            <h2 className="mx-auto max-w-3xl font-serif text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-6">{c.finalCta.title}</h2>
            <p className="mx-auto max-w-2xl text-lg text-stone-300 mb-10 leading-relaxed">{c.finalCta.sub}</p>
            <button
              onClick={handleAppStoreClick}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-stone-900 rounded-full font-semibold hover:bg-stone-100 transition-colors mb-8"
            >
              <AppleIcon className="w-5 h-5" />
              {c.finalCta.downloadFree}
            </button>
            <div className="flex justify-center gap-x-6 gap-y-2 flex-wrap text-sm text-stone-400">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#1b8af1]" /> {c.finalCta.noCreditCard}
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#1b8af1]" /> {c.finalCta.freeForever}
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#1b8af1]" /> {c.finalCta.fastSetup}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#FAF9F6] border-t border-stone-200 py-14">
        <div className="container mx-auto px-4 flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <Link to="/" className="flex items-center gap-0">
            <img src={logo} alt="Empath" className="w-9 h-9 object-contain" />
            <span className="text-lg tracking-tight text-stone-900">Empath</span>
          </Link>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-sm font-medium text-stone-500">
            <Link to="/privacy" className="hover:text-stone-900 transition-colors">{c.footer.privacy}</Link>
            <Link to="/terms" className="hover:text-stone-900 transition-colors">{c.footer.terms}</Link>
          </div>
          <p className="text-stone-400 text-xs">© {new Date().getFullYear()} Reality Articulated Inc.</p>
        </div>
      </footer>
    </div>
  );
}
