import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Phone,
  MessageSquare,
  Star,
  ArrowRight,
  FileText,
  Lock,
  ShieldCheck,
  Download,
  KeyRound,
  ScanFace,
  PenSquare,
  Lightbulb,
  LayoutGrid,
  UserSquare,
  SquareStack,
  Upload,
  WifiOff,
  MapPin,
  CalendarDays,
  CloudSun,
  Target,
} from 'lucide-react';
import logo from '../../public/empath-logo.png';
import { Toaster } from 'react-hot-toast';
import posthog from 'posthog-js';
import { useFeatureFlagVariantKey } from 'posthog-js/react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import MessagingChannelsCarousel from '../components/MessagingChannelsCarousel';
import WhatsAppExamples from '../components/WhatsAppExamples';
import TryEmpathDemo from '../components/TryEmpathDemo';
import CallMeForm from '../components/CallMeForm';
import FAQItem from '../components/FAQItem';
import PhoneScreenshot from '../components/PhoneScreenshot';
import DesktopQRCodes from '../components/DesktopQRCodes';
import { WhatsAppIcon, AppleIcon } from '../components/ChannelIcons';
import { useJournalingCopy } from '../i18n/copy';
import { heroExperimentV3 } from '../i18n/copy/journaling.en';
import { openSupportChat } from '../utils/supportChat';
import { SMS_ENABLED } from '../utils/channels';
import { useIsUSVisitor } from '../utils/geo';
import { buildChannelHref, captureChannelLinkClick, getChannelRefCode } from '../utils/attribution';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

// Shared type styles for the calm editorial look: one accent colour, small
// tracked eyebrows, serif headings at medium weight, hairline borders.
const EYEBROW = 'text-xs font-semibold uppercase tracking-[0.18em] text-[#1b8af1]';
const H2 = 'font-serif text-3xl md:text-[2.75rem] font-medium tracking-tight leading-[1.12] text-stone-900';
const LEAD = 'text-lg text-stone-600 leading-relaxed';
const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-stone-900 text-white rounded-full font-semibold hover:bg-[#1b8af1] transition-colors';

interface SpotlightPoint {
  title: string;
  desc: string;
}

/** Text column shared by every feature spotlight. */
function SpotlightText({
  eyebrow,
  title,
  body,
  points,
}: {
  eyebrow: string;
  title: string;
  body: string;
  points: SpotlightPoint[];
}) {
  return (
    <div>
      <p className={EYEBROW}>{eyebrow}</p>
      <h2 className={`${H2} mt-4`}>{title}</h2>
      <p className={`${LEAD} mt-5`}>{body}</p>
      <ul className="mt-8 space-y-5">
        {points.map((point) => (
          <li key={point.title} className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50">
              <Check className="h-3.5 w-3.5 text-[#1b8af1]" strokeWidth={3} />
            </span>
            <div>
              <p className="font-semibold text-stone-900">{point.title}</p>
              <p className="mt-0.5 text-stone-600 leading-relaxed">{point.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function JournalingPage() {
  const c = useJournalingCopy();
  const h = c.home;
  // PostHog experiment `landing-hero-copy-3`: 16-arm test (the v2 winner
  // "chatgpt-context" carried forward as `control`, plus 15 new challengers)
  // swapping the hero H1 only (the subheadline that says what Empath is
  // is shared by every arm). Anything else (control, flag missing, flags
  // not yet loaded, bots, unmatched variant key) renders the default hero,
  // which is also what the prerendered HTML contains, so SEO snapshots stay
  // stable. Existing CTA click events carry the active flag, so they double
  // as goal metrics.
  // (v1 flag `landing-hero-copy` retired 2026-08-09; v2 `landing-hero-copy-2`
  // retired once `chatgpt-context` won and became v3's `control`.)
  const heroVariant = useFeatureFlagVariantKey('landing-hero-copy-3');
  const heroHeadline =
    typeof heroVariant === 'string' && heroExperimentV3[heroVariant] ? heroExperimentV3[heroVariant] : c.hero;
  const refCode = getChannelRefCode();
  // The phone number only takes US calls: hide the call link entirely for
  // everyone else rather than showing one that won't work. Defaults to
  // hidden until confirmed, so it never flashes for a non-US visitor.
  const isUS = useIsUSVisitor();
  // Android waitlist field. Emails live in PostHog only
  // (`android_interest_submitted`); there is no backend waitlist table.
  const [androidEmail, setAndroidEmail] = useState('');
  const [androidSubmitted, setAndroidSubmitted] = useState(false);
  const handleAndroidInterest = (e: React.FormEvent) => {
    e.preventDefault();
    const email = androidEmail.trim();
    if (!email) return;
    posthog.capture('android_interest_submitted', { email });
    setAndroidSubmitted(true);
  };
  const PHONE_MAIN = '+18883663082';
  const PHONE_DISPLAY = '+1 (888) 366-3082'; // Human-readable form for prominent display
  const APP_STORE_URL = 'https://apps.apple.com/us/app/empath-ai-diary-for-your-mind/id6472873287';

  useEffect(() => {
    posthog.capture('journaling_page_viewed');
  }, []);

  const handleAppStoreClick = () => {
    posthog.capture('journaling_page_app_store_clicked');
    // Open as a normal new tab. Passing a windowFeatures string (e.g.
    // 'noopener,noreferrer') makes browsers open a popup window instead, which
    // popup blockers reject and mobile Safari surfaces as an error page.
    const newWindow = window.open(APP_STORE_URL, '_blank');
    if (newWindow) newWindow.opener = null;
  };

  // FAQ structured data derives from the same catalog the accordion renders.
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

  // "Everything else" grid: the eight catalog items plus the four extras.
  // Icons are index-matched to `featureGrid.items` then `home.grid.extra`;
  // reorder both together.
  const gridItems = [...c.featureGrid.items, ...h.grid.extra];
  const gridIcons = [
    ScanFace,
    PenSquare,
    Lightbulb,
    LayoutGrid,
    UserSquare,
    SquareStack,
    Upload,
    WifiOff,
    MapPin,
    CalendarDays,
    CloudSun,
    Target,
  ];
  // Index-matched to `home.privacy.cards`.
  const privacyIcons = [Lock, ShieldCheck, Download, KeyRound];

  return (
    <div className="flex-grow bg-[#FAF9F6] text-stone-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title={c.seo.title}
        description={c.seo.description}
        path="/app"
        keywords={c.seo.keywords}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appFaqSchema) }}
      />
      <Toaster position="top-center" />

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-[#FAF9F6]/85 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3.5">
          <Link to="/" className="flex items-center gap-0">
            <div className="flex h-10 w-10 items-center justify-center">
              <img src={logo} alt="Empath Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-lg tracking-tight text-stone-900">Empath</span>
          </Link>

          <nav className="flex items-center gap-8">
            <a href="#features" className="hidden text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 md:block">{c.header.features}</a>
            <a href="#privacy" className="hidden text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 md:block">{h.nav.privacy}</a>
            <a href="#faq" className="hidden text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 md:block">{c.header.faq}</a>
            <Link to="/app/blog" className="hidden text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 md:block">{c.header.blog}</Link>
            <Link to="/therapist" className="hidden text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 md:block">{c.header.therapists}</Link>
            <button
              onClick={handleAppStoreClick}
              className="rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1b8af1]"
            >
              {c.header.download}
            </button>
          </nav>
        </div>
      </header>

      {/* --- 1. HERO --- */}
      {/* App first: one primary download button, WhatsApp as a quiet text
          link. Every other channel lives in the Channels section. */}
      <motion.section
        className="overflow-hidden pt-20 md:pt-28"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <motion.h1
            variants={fadeUp}
            className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-stone-900 sm:text-6xl md:text-7xl"
          >
            {heroHeadline.h1Pre}{' '}
            <span className="italic text-[#1b8af1]">{heroHeadline.h1Highlight}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-stone-600 md:text-xl">
            {c.hero.sub}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <button onClick={handleAppStoreClick} className={`${BTN_PRIMARY} text-base`}>
              <AppleIcon className="h-5 w-5" />
              {c.hero.getApp}
            </button>
            <a
              href={buildChannelHref('whatsapp', c.channelRow.prefill, refCode)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => captureChannelLinkClick('journaling_page_hero', 'whatsapp', refCode)}
              className="inline-flex items-center gap-2 font-medium text-stone-600 transition-colors hover:text-stone-900"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              {h.hero.orWhatsapp}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-stone-500">
            {h.hero.proof.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#1b8af1]" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Three phones, centre one raised. The row is clipped at the bottom
            so the hero ends on the screens rather than on empty space. */}
        <motion.div variants={fadeUp} className="container mx-auto mt-16 px-4">
          <div className="mx-auto flex max-h-[26rem] max-w-4xl items-start justify-center gap-5 overflow-hidden md:max-h-[32rem] md:gap-6 lg:gap-8">
            <PhoneScreenshot src="/app-screens/home-journals.webp" alt={h.hero.shots[0]} eager className="mt-14 hidden w-40 shrink-0 sm:block md:w-52 lg:w-64" />
            <PhoneScreenshot src="/app-screens/home-insights.webp" alt={h.hero.shots[1]} eager className="w-64 shrink-0 sm:w-52 md:w-64 lg:w-72" />
            <PhoneScreenshot src="/app-screens/home-day-colors.webp" alt={h.hero.shots[2]} eager className="mt-14 hidden w-40 shrink-0 sm:block md:w-52 lg:w-64" />
          </div>
        </motion.div>
      </motion.section>

      {/* --- 2. SPOTLIGHT: AI COMPANION --- */}
      {/* The interactive chat demo is this spotlight's visual. */}
      <section id="features" className="scroll-mt-20 border-t border-stone-200 bg-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <SpotlightText
                eyebrow={h.companion.eyebrow}
                title={h.companion.title}
                body={h.companion.body}
                points={h.companion.points}
              />
            </motion.div>
            <motion.div variants={fadeUp} className="min-w-0">
              <TryEmpathDemo />
              <p className="mx-auto mt-5 max-w-md text-center text-sm text-stone-500">{h.companion.demoNote}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 3. SPOTLIGHT: DEEPER INSIGHTS --- */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="order-2 md:order-1">
              <PhoneScreenshot src="/app-screens/home-deeper-insights.webp" alt={h.insights.shot} className="mx-auto w-64 md:w-72" />
            </motion.div>
            <motion.div variants={fadeUp} className="order-1 md:order-2">
              <SpotlightText
                eyebrow={h.insights.eyebrow}
                title={h.insights.title}
                body={h.insights.body}
                points={h.insights.points}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 4. SPOTLIGHT: MOOD ANALYSIS (includes Apple Health) --- */}
      <section className="border-y border-stone-200 bg-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <SpotlightText
                eyebrow={h.mood.eyebrow}
                title={h.mood.title}
                body={h.mood.body}
                points={h.mood.points}
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <PhoneScreenshot src="/app-screens/home-mood.webp" alt={h.mood.shot} className="mx-auto w-64 md:w-72" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 5. SPOTLIGHT: VOICE, PHOTOS, TEXT --- */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="order-2 md:order-1">
              <PhoneScreenshot src="/app-screens/home-voice.webp" alt={h.capture.shot} className="mx-auto w-64 md:w-72" />
            </motion.div>
            <motion.div variants={fadeUp} className="order-1 md:order-2">
              <SpotlightText
                eyebrow={h.capture.eyebrow}
                title={h.capture.title}
                body={h.capture.body}
                points={h.capture.points}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SPOTLIGHT: PEOPLE --- */}
      <section className="border-t border-stone-200 bg-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <SpotlightText
                eyebrow={h.people.eyebrow}
                title={h.people.title}
                body={h.people.body}
                points={h.people.points}
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <PhoneScreenshot src="/app-screens/home-people.webp" alt={h.people.shot} className="mx-auto w-64 md:w-72" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 6. THERAPIST CONNECTION --- */}
      {/* The one tinted band on the page, so this section reads as its own
          chapter. The weekly summary is a coded mock, not a screenshot. */}
      <section id="therapist-connection" className="scroll-mt-20 bg-[#EEF5FE] py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <SpotlightText
                eyebrow={h.therapist.eyebrow}
                title={h.therapist.title}
                body={c.feature6.sub}
                points={c.feature6.items}
              />

              <ul className="mt-8 flex flex-wrap gap-2">
                {c.feature6.privacyBadges.map((badge) => (
                  <li
                    key={badge}
                    className="flex items-center gap-1.5 rounded-full border border-blue-200 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-stone-700"
                  >
                    <ShieldCheck className="h-4 w-4 text-[#1b8af1]" />
                    {badge}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-stone-600">
                {h.therapist.linkLead}{' '}
                <Link to="/therapist" className="inline-flex items-center gap-1 font-semibold text-[#1b8af1] hover:underline">
                  {h.therapist.link}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="mx-auto max-w-md rounded-3xl border border-stone-200 bg-white p-7 shadow-lift">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
                    <FileText className="h-5 w-5 text-[#1b8af1]" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">{c.feature6.mockTitle}</p>
                    <p className="text-xs text-stone-500">{c.feature6.mockSub}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#FAF9F6] p-4">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">{c.feature6.mockMoodLabel}</p>
                    <p className="text-sm leading-relaxed text-stone-700">{c.feature6.mockMoodText}</p>
                  </div>

                  <div className="rounded-2xl bg-[#FAF9F6] p-4">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">{c.feature6.mockMomentsLabel}</p>
                    <ul className="space-y-2">
                      {c.feature6.mockMoments.map((moment) => (
                        <li key={moment} className="flex items-start gap-2 text-sm leading-relaxed text-stone-700">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#1b8af1]" />
                          {moment}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1b8af1]">{c.feature6.mockFocusLabel}</p>
                    <p className="text-sm leading-relaxed text-stone-700">{c.feature6.mockFocusText}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 7. EVERYTHING ELSE --- */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className={EYEBROW}>{h.grid.eyebrow}</p>
              <h2 className={`${H2} mt-4`}>{h.grid.title}</h2>
              <p className={`${LEAD} mt-5`}>{c.featureGrid.sub}</p>
            </div>

            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {gridItems.map((item, i) => {
                const Icon = gridIcons[i];
                return (
                  <div key={item.title}>
                    <Icon className="h-6 w-6 text-[#1b8af1]" strokeWidth={1.75} />
                    <h3 className="mt-4 font-semibold text-stone-900">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- 8. CHANNELS --- */}
      {/* WhatsApp examples, every messaging channel, the QR codes, and the
          "Empath calls you" form, merged into one section. */}
      <section id="channels" className="scroll-mt-20 border-t border-stone-200 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className={EYEBROW}>{h.channels.eyebrow}</p>
              <h2 className={`${H2} mt-4`}>{h.channels.title}</h2>
              <p className={`${LEAD} mt-5`}>{h.channels.body}</p>
            </div>

            <WhatsAppExamples />
            <p className="mt-8 text-center text-xs text-stone-400">{h.channels.examplesNote}</p>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-soft md:p-10">
                <h3 className="font-serif text-2xl font-medium text-stone-900">{h.channels.messageTitle}</h3>
                <p className="mt-3 leading-relaxed text-stone-600">{h.channels.messageBody}</p>

                <a
                  href={buildChannelHref('whatsapp', c.channelRow.prefill, refCode)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => captureChannelLinkClick('journaling_page_wa_examples', 'whatsapp', refCode)}
                  className="mt-7 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#1fb857]"
                >
                  <WhatsAppIcon className="h-5 w-5" /> {c.whatsappSection.cta}
                </a>

                <p className="mb-3 mt-8 text-sm text-stone-500">{c.hero.orFavoriteApp}</p>
                <MessagingChannelsCarousel eventPrefix="journaling_page" className="!justify-start" />

                {(isUS || SMS_ENABLED) && (
                  <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                    {SMS_ENABLED && (
                      <a
                        href={`sms:${PHONE_MAIN}`}
                        title={`${c.hero.textUsAt} ${PHONE_DISPLAY}`}
                        onClick={() => posthog.capture('journaling_page_text_clicked')}
                        className="inline-flex items-center gap-2 text-stone-600 transition-colors hover:text-stone-900"
                      >
                        <MessageSquare className="h-4 w-4" /> {c.hero.textToJournal}
                      </a>
                    )}
                    {isUS && (
                      <a
                        href={`tel:${PHONE_MAIN}`}
                        title={`${c.hero.callUsAt} ${PHONE_DISPLAY}`}
                        onClick={() => posthog.capture('journaling_page_call_clicked')}
                        className="inline-flex items-center gap-2 text-stone-600 transition-colors hover:text-stone-900"
                      >
                        <Phone className="h-4 w-4" /> {c.hero.callAndTalk}: {PHONE_DISPLAY}
                      </a>
                    )}
                  </div>
                )}

                {/* Desktop can't tap the wa.me link above: give the phone something to scan */}
                <DesktopQRCodes className="mt-9 hidden md:block" />
              </div>

              <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-soft md:p-10">
                <h3 className="font-serif text-2xl font-medium text-stone-900">{h.channels.callTitle}</h3>
                <p className="mb-7 mt-3 leading-relaxed text-stone-600">{c.callsYou.sub}</p>
                <CallMeForm eventPrefix="journaling_page" source="homepage_section" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 9. PRIVACY --- */}
      <section id="privacy" className="scroll-mt-20 border-t border-stone-200 bg-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className={EYEBROW}>{h.privacy.eyebrow}</p>
              <h2 className={`${H2} mt-4`}>{h.privacy.title}</h2>
              <p className={`${LEAD} mt-5`}>{h.privacy.sub}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {h.privacy.cards.map((card, i) => {
                const Icon = privacyIcons[i];
                return (
                  <div key={card.title} className="rounded-3xl border border-stone-200 bg-[#FAF9F6] p-7">
                    <Icon className="h-6 w-6 text-[#1b8af1]" strokeWidth={1.75} />
                    <h3 className="mt-5 font-semibold text-stone-900">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- 10. REVIEWS --- */}
      <section className="border-t border-stone-200 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className={EYEBROW}>{h.reviews.eyebrow}</p>
            <h2 className={`${H2} mt-4`}>{c.socialProof.title}</h2>
            <div className="mt-5 flex items-center justify-center gap-2 text-sm text-stone-500">
              <span className="flex gap-0.5 text-[#1b8af1]" aria-hidden="true">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </span>
              {c.socialProof.featured}
            </div>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {c.socialProof.testimonials.map((t) => (
              <figure key={t.author} className="flex flex-col rounded-3xl border border-stone-200 bg-white p-8 shadow-soft">
                <div className="mb-5 flex gap-0.5 text-[#1b8af1]" aria-hidden="true">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="flex-grow font-serif text-lg leading-relaxed text-stone-800">"{t.quote}"</blockquote>
                <figcaption className="mt-6">
                  <p className="font-semibold text-stone-900">{t.author}</p>
                  <p className="text-sm text-stone-500">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* --- 11. FAQ --- */}
      <section id="faq" className="scroll-mt-20 border-t border-stone-200 bg-white py-24 md:py-32">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-12 text-center">
            <p className={EYEBROW}>{h.faq.eyebrow}</p>
            <h2 className={`${H2} mt-4`}>{c.faq.title}</h2>
          </div>
          <div>
            {c.faq.items.map((item, i) => (
              <FAQItem
                key={i}
                question={item.q}
                answer={
                  item.link ? (
                    <>
                      {item.a}{' '}
                      <Link to={item.link.to} className="font-semibold text-[#1b8af1] hover:underline">{item.link.text}</Link>.
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
      {/* Absorbs the old iOS callout and the Android waitlist card. */}
      <section className="bg-white px-4 pb-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-stone-900 px-6 py-16 text-center text-white md:px-16 md:py-20">
            <h2 className="mx-auto max-w-3xl font-serif text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl">
              {c.finalCta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-300">
              {c.finalCta.sub}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <button
                onClick={handleAppStoreClick}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-semibold text-stone-900 transition-colors hover:bg-stone-100"
              >
                <AppleIcon className="h-5 w-5" />
                {c.finalCta.downloadFree}
              </button>
              <a
                href={buildChannelHref('whatsapp', c.channelRow.prefill, refCode)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => captureChannelLinkClick('final_cta', 'whatsapp', refCode)}
                className="inline-flex items-center gap-2 font-medium text-stone-300 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                {h.hero.orWhatsapp}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-stone-400">
              {[c.finalCta.noCreditCard, c.finalCta.freeForever, c.finalCta.fastSetup].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#1b8af1]" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Android waitlist: nothing shippable yet, so this only collects intent. */}
            <div className="mx-auto mt-12 max-w-xl border-t border-white/10 pt-10">
              <p className="font-semibold text-white">{c.androidInterest.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">{c.androidInterest.body}</p>
              {androidSubmitted ? (
                <p className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-stone-200">
                  <Check className="h-4 w-4 shrink-0 text-[#1b8af1]" /> {c.androidInterest.success}
                </p>
              ) : (
                <form onSubmit={handleAndroidInterest} className="mx-auto mt-5 flex max-w-md flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={androidEmail}
                    onChange={(e) => setAndroidEmail(e.target.value)}
                    placeholder={c.androidInterest.placeholder}
                    aria-label={c.androidInterest.placeholder}
                    className="min-w-0 flex-grow rounded-full border border-white/20 bg-white/5 px-5 py-3 text-white placeholder:text-stone-500 focus:border-[#1b8af1] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="whitespace-nowrap rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-stone-900"
                  >
                    {c.androidInterest.button}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-stone-200 bg-[#FAF9F6] py-14">
        <div className="container mx-auto flex flex-col items-center gap-8 px-4 md:flex-row md:justify-between">
          <Link to="/" className="flex items-center gap-0">
            <img src={logo} alt="Empath" className="h-9 w-9 object-contain" />
            <span className="text-lg tracking-tight text-stone-900">Empath</span>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-stone-500">
            <Link to="/app/blog" className="transition-colors hover:text-stone-900">{c.header.blog}</Link>
            <Link to="/therapist" className="transition-colors hover:text-stone-900">{c.header.therapists}</Link>
            <Link to="/privacy" className="transition-colors hover:text-stone-900">{c.footer.privacy}</Link>
            <Link to="/terms" className="transition-colors hover:text-stone-900">{c.footer.terms}</Link>
            <button
              type="button"
              onClick={() => openSupportChat()}
              className="font-medium transition-colors hover:text-stone-900"
            >
              {c.footer.support}
            </button>
          </div>
          <p className="text-xs text-stone-400">© {new Date().getFullYear()} Reality Articulated Inc.</p>
        </div>
      </footer>
    </div>
  );
}
