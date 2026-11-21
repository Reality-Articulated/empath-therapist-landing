import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import posthog from 'posthog-js';
import SEO from '../components/SEO';
import FAQItem from '../components/FAQItem';
import TherapistHeader from '../components/therapist/TherapistHeader';
import TherapistFooter from '../components/therapist/TherapistFooter';
import PhoneScreenshot from '../components/PhoneScreenshot';
import {
  DashboardPreview,
  CapturePhoneMock,
  SignalsMock,
  BriefMock,
  StandOutMock,
  AskDataMock,
  CaseCompassMock,
} from '../components/therapist/DashboardMocks';
import { openSupportChat } from '../utils/supportChat';
import { THERAPIST_BOOKING_URL } from '../utils/therapistBooking';

import {
  Clock,
  TrendingUp,
  Users,
  HeartPulse,
  Building2,
  Activity,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  FileCheck,
  Ban,
  ChevronRight,
  MessageSquare,
  Check,
  X,
  Repeat,
  BellOff,
  Lock,
  LifeBuoy,
  FileText,
  Gift,
  Languages,
  BookOpen,
  UserRound,
  Send,
  Phone,
  Mic,
  Camera,
  Smartphone,
} from 'lucide-react';

const DASHBOARD_URL = 'https://app.empathdash.com/';
const APP_STORE_URL = 'https://apps.apple.com/us/app/empath-ai-diary-for-your-mind/id6472873287';

// Shared class strings: the consumer homepage's calm design language (cream
// and white bands, hairline stone borders, soft shadows, serif headlines at
// medium weight, pill buttons, #1b8af1 as the single accent).
const PRIMARY_BTN =
  'px-7 py-3.5 bg-stone-900 text-white rounded-full hover:bg-[#1b8af1] transition-colors duration-200 font-semibold inline-flex items-center justify-center gap-2 text-base cursor-pointer';
const SECONDARY_BTN =
  'px-7 py-3.5 bg-white text-stone-900 rounded-full border border-stone-300 hover:border-stone-900 transition-colors duration-200 font-semibold inline-flex items-center justify-center gap-2 text-base cursor-pointer';
const H2 = 'font-serif text-3xl md:text-[2.75rem] font-medium tracking-tight leading-[1.12] text-stone-900 mb-6';
const SECTION_SUB = 'text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto';
const EYEBROW = 'text-xs font-semibold uppercase tracking-[0.18em] text-[#1b8af1] mb-5';
const CARD = 'p-8 rounded-3xl border border-stone-200 shadow-soft';
const STEP_LABEL = 'inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[#1b8af1] mb-4';

// Step 1 of "How it works": every way a client can capture an entry.
const captureWays = [
  { icon: MessageCircle, label: 'WhatsApp' },
  { icon: Send, label: 'Telegram' },
  { icon: Phone, label: 'Phone call' },
  { icon: Sparkles, label: 'AI chat' },
  { icon: Mic, label: 'Voice notes' },
  { icon: Camera, label: 'Photos' },
  { icon: Smartphone, label: 'Empath app' },
];

const proofStats = [
  { value: '650+', label: 'people journaling on Empath' },
  { value: '2,000+', label: 'journal entries captured' },
  { value: '45', label: 'languages supported' },
];

const trustPoints = [
  {
    icon: BellOff,
    tint: 'bg-blue-50 text-[#1b8af1]',
    title: 'Not a monitoring system',
    body: 'Empath is a journaling and reflection tool. You are never on call and never expected to watch entries between sessions. The brief waits for you until you prepare for the appointment.',
  },
  {
    icon: Lock,
    tint: 'bg-blue-50 text-[#1b8af1]',
    title: 'Clients control what is shared',
    body: 'Every connection needs the client\'s approval, they choose exactly what reaches you, and entries they lock never leave their journal.',
  },
  {
    icon: LifeBuoy,
    tint: 'bg-blue-50 text-[#1b8af1]',
    title: 'Crisis help is crisis services',
    body: 'If a client is in crisis, the app directs them to call 911 or the 988 Suicide and Crisis Lifeline (US). Crisis help is those services, not a journal entry.',
  },
  {
    icon: ShieldCheck,
    tint: 'bg-blue-50 text-[#1b8af1]',
    title: 'Encrypted, never used to train AI',
    body: 'Client data is encrypted at rest and in transit, and none of it is used to train AI models.',
  },
  {
    icon: FileText,
    tint: 'bg-blue-50 text-[#1b8af1]',
    title: 'Straight about HIPAA',
    body: 'Empath is not currently HIPAA certified. Use it as a supplementary reflection tool alongside your clinical records, not as a system of record.',
  },
];

const features = [
  {
    icon: Clock,
    tint: 'bg-blue-50 text-[#1b8af1]',
    title: 'Pre-Session Catch-Up Summaries',
    description: "Save the 15 minutes you'd otherwise spend re-orienting. Every brief opens with what changed since the last session, not a blank page.",
  },
  {
    icon: Users,
    tint: 'bg-blue-50 text-[#1b8af1]',
    title: 'People & Relationship Insights',
    description: "See which relationships track with a client's emotional volatility over time, so you can raise it before they do.",
  },
  {
    icon: HeartPulse,
    tint: 'bg-blue-50 text-[#1b8af1]',
    title: 'Biometric & Mood Synthesis',
    description: 'When a client opts into Apple Health, Empath lines up sleep, activity, and heart-rate variability against mood, so a rough week reads as data, not a mystery.',
  },
  {
    icon: Building2,
    tint: 'bg-blue-50 text-[#1b8af1]',
    title: 'White-Label Practice Extension',
    description: "Offer Empath under your own practice's name and colors, a premium touch that extends your care between sessions instead of ending at the door.",
  },
];

const offerItems = [
  { title: 'Two client seats, free forever', body: 'Everything included, no card needed to start.' },
  { title: 'Beta access to couples therapy tools', body: 'See both partners\' weeks side by side before a joint session.' },
  { title: 'Your practice name and colors', body: 'Shown inside your client\'s app, so it reads as your tool.' },
  { title: 'Personal setup with the founder', body: 'Div walks you through your dashboard and your first client connection.' },
];

const faqs = [
  {
    q: 'How much does it cost?',
    a: 'Your first two client seats are free forever, with everything included. Each additional client seat is $9.99 a month, billed monthly, and you can add or remove seats any time from your dashboard. A seat is one client; pending invitations count, and removing a client frees their seat right away.',
  },
  {
    q: 'Do my clients pay anything?',
    a: 'No. Connecting to you costs your client nothing, and the Empath app is free for them to use. If a client chooses an Empath+ subscription for themselves, that is their own optional purchase and has nothing to do with your seats.',
  },
  {
    q: 'Will this add to my administrative workload?',
    a: "No. It's built to shrink admin time, not add to it. Your dashboard turns a week of client activity into one short brief, so pre-session prep and note-writing take less time, not more.",
  },
  {
    q: 'How do clients respond to messaging Empath?',
    a: "Very well, because there's nothing new to learn. Clients text or send a voice note on WhatsApp or Telegram, apps already open on their phone, so engagement holds up in ways a dedicated homework app never did.",
  },
  {
    q: 'How is client data protected?',
    a: 'Client data is encrypted at rest and in transit, none of it is used to train AI models, and access is limited to the client and their therapist. Clients choose what is shared with you. Empath is not currently HIPAA certified, so treat it as a supplementary reflection tool alongside your clinical records, not as a system of record.',
  },
  {
    q: 'Does Empath try to replace the therapist?',
    a: "No, and it isn't built to. Empath is an administrative and reflective co-pilot: it handles memory, pattern recognition, and data synthesis between sessions, while your clinical judgment, attunement, and the therapeutic relationship stay entirely yours.",
  },
  {
    q: 'What do I actually see before a session?',
    a: 'A short, plain-language brief: mood trends, notable events, people who came up, and a couple of signals worth raising, built from what your client shared since you last met. No raw transcripts unless you want them.',
  },
  {
    q: "Can I offer this under my own practice's brand?",
    a: "Yes. Group practices and private clinicians can offer Empath as a white-labeled extension of their care, so it reads as your practice's tool, not a third-party app.",
  },
];

const therapistFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

type CtaLocation = 'hero' | 'pricing' | 'final';

export default function HomePage() {
  const [showSampleBrief, setShowSampleBrief] = useState(false);
  const [pricingRef, pricingInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (pricingInView) {
      posthog.capture('therapist_pricing_viewed');
    }
  }, [pricingInView]);

  const trackEarlyAccess = (location: CtaLocation) => {
    posthog.capture('therapist_cta_clicked', { cta: 'early_access', location });
  };

  const openSampleBrief = (location: CtaLocation) => {
    posthog.capture('therapist_cta_clicked', { cta: 'sample_brief', location });
    posthog.capture('therapist_sample_brief_opened', { location });
    setShowSampleBrief(true);
  };

  return (
    <div className="flex-grow bg-[#FAF9F6] text-stone-900 overflow-x-clip">
      <SEO
        title="Empath for Therapists | Between-Session AI Insights"
        description="Empath captures what happens between sessions so therapists can see how clients are doing in real life, not just what they remember to share. AI-powered insights, secure and private by design."
        path="/therapist"
        keywords="therapist software, between-session insights, AI for therapists, therapy outcomes, clinical decision support, therapy practice management"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(therapistFaqSchema) }}
      />

      <TherapistHeader />

      {/* ============ 1. HERO ============ */}
      <section className="relative bg-white pt-20 md:pt-28 pb-16 overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <p className={EYEBROW}>For private practice therapists and group practices</p>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-stone-900 mb-7 leading-[1.08]">
            Walk into every session{' '}
            <span className="italic text-[#1b8af1]">already caught up.</span>
          </h1>

          <p className="text-lg md:text-xl text-stone-600 mb-9 max-w-3xl mx-auto leading-relaxed">
            Empath turns your client's life between sessions into a 3-minute brief, captured with zero friction over
            WhatsApp, Telegram, or a quick voice call, so your human judgment does the rest.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
            <a
              href={THERAPIST_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEarlyAccess('hero')}
              className={`${PRIMARY_BTN} flex-1`}
              aria-label="Get early access: book a call"
            >
              Get early access
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <button type="button" onClick={() => openSampleBrief('hero')} className={`${SECONDARY_BTN} flex-1`}>
              See a sample brief
            </button>
          </div>
          <p className="text-sm text-stone-500 mt-4">
            2 client seats free forever. No card.
          </p>
        </div>

        {/* The product, shown once and clearly: a replica of the client view a
            therapist opens before a session (fictional client). */}
        <div className="container mx-auto px-4 mt-14">
          <DashboardPreview />
          <p className="text-center text-xs text-stone-400 mt-6">
            Your dashboard before a session. Illustrative example, not a real client.
          </p>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="py-5 bg-white border-y border-stone-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-x-8 gap-y-3 flex-wrap">
            <div className="flex items-center gap-2 text-stone-700">
              <ShieldCheck className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
              <span className="font-semibold text-sm">Encrypted at rest and in transit</span>
            </div>
            <span className="text-stone-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-2 text-stone-700">
              <FileCheck className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
              <span className="font-semibold text-sm">Clients control what's shared</span>
            </div>
            <span className="text-stone-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-2 text-stone-700">
              <Ban className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
              <span className="font-semibold text-sm">Zero data used for AI training</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. PROOF STRIP ============ */}
      {/* Real, current figures only. Update them here or remove the strip;
          never let them go stale. */}
      <section className="py-14 bg-[#FAF9F6] border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
            {proofStats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-3xl border border-stone-200 shadow-soft px-5 py-6 text-center">
                <div className="text-3xl md:text-4xl font-medium text-stone-900 font-serif">{stat.value}</div>
                <div className="text-sm text-stone-600 mt-1">{stat.label}</div>
              </div>
            ))}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-900 text-white rounded-3xl px-5 py-6 flex flex-col items-center justify-center text-center hover:bg-[#1b8af1] transition-colors"
              aria-label="Empath is live on the App Store"
            >
              <svg className="w-8 h-8 mb-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              <div className="text-sm font-semibold">Live on the App Store</div>
              <div className="text-xs text-stone-300 mt-0.5">The app your clients use</div>
            </a>
          </div>
        </div>
      </section>

      {/* ============ 3. THE 167-HOUR BLACK HOLE ============ */}
      <section className="py-24 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className={EYEBROW}>The missing data problem</p>
              <h2 className={H2}>
                The 167-hour <span className="text-stone-400">black hole</span>
              </h2>
              <p className={SECTION_SUB}>
                A weekly session gives you 1 hour of direct observation. The other 167 happen where you can't see them.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#FAF9F6] rounded-3xl border border-stone-200 p-7">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-xl font-semibold text-stone-900">Session recall alone</h3>
                    <p className="text-sm text-stone-600 mt-1">
                      Whatever a client remembers to mention, filtered by how they feel in the room that day.
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-medium text-stone-500 font-serif">1 hr</div>
                    <div className="text-xs text-stone-500">of the week</div>
                  </div>
                </div>
                <div className="h-10 bg-white border border-stone-200 rounded-full flex items-center px-4 mb-5" aria-hidden="true">
                  <div className="w-1.5 h-6 bg-stone-900 rounded-sm"></div>
                  <span className="ml-3 text-xs text-stone-400">1 hour of direct observation</span>
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">
                  <span className="font-semibold text-stone-900">Recall bias does the rest.</span> Triggers, avoidant
                  patterns, and small breakthroughs get smoothed over or forgotten entirely.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-blue-200 shadow-lift p-7">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-xl font-semibold text-stone-900">With Empath</h3>
                    <p className="text-sm text-stone-600 mt-1">
                      Captured in the moment, with no extra effort from your client.
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-medium text-[#1b8af1] font-serif">168 hrs</div>
                    <div className="text-xs text-stone-500">in view</div>
                  </div>
                </div>
                <div className="h-10 bg-[#1b8af1] rounded-full flex items-center justify-center px-2 mb-5" aria-hidden="true">
                  <span className="text-xs text-white font-semibold">Sleep, mood, relationships, and triggers, as they happen</span>
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">
                  <span className="font-semibold text-stone-900">No homework required.</span> Clients text or voice-note
                  through a channel they already have open, so the data shows up without them trying harder.
                </p>
              </div>
            </div>

            <p className="text-center text-lg text-stone-600 mt-12 max-w-2xl mx-auto">
              From a single snapshot to the full week: your clinical judgment works with{' '}
              <span className="font-semibold text-stone-900">real context, not a client's best guess at recall.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ============ 4. HOW IT WORKS (merged with "How It All Fits Together") ============ */}
      <section id="how-it-works" className="py-24 bg-[#FAF9F6] border-b border-stone-200 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={H2}>How it works, in three steps</h2>
              <p className={SECTION_SUB}>
                Empath sits between sessions, not inside them. No new workflow for you, and no new app for your client
                to remember to open.
              </p>
            </div>

            <div className="space-y-20">
              {/* Step 1 */}
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div>
                  <span className={STEP_LABEL}>Step 01 · Your client, between sessions</span>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-stone-900 mb-4">Zero-friction client capture</h3>
                  <p className="text-stone-600 leading-relaxed mb-5">
                    Clients log life as it happens over WhatsApp, Telegram, or a quick voice call. Apps they already
                    open, so it keeps happening, and homework compliance holds.
                  </p>
                  <p className="flex items-start gap-3 text-stone-700">
                    <Languages className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    Clients journal in their own language, with 45 supported.
                  </p>
                  <Link
                    to="/"
                    onClick={() => posthog.capture('therapist_cta_clicked', { cta: 'client_side', location: 'how_it_works' })}
                    className="mt-5 inline-flex items-center gap-1 text-[#1b8af1] font-semibold hover:underline"
                  >
                    See what your client sees
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
                <div>
                  {/* Both ways a client captures: the chat mock, and the real
                      iOS app, which links to the client landing page. */}
                  <div className="flex flex-wrap items-start justify-center gap-x-5 gap-y-8">
                    <div>
                      <CapturePhoneMock />
                      <p className="text-center text-xs text-stone-500 mt-3">In the chat apps they already use</p>
                    </div>
                    <Link
                      to="/"
                      onClick={() => posthog.capture('therapist_cta_clicked', { cta: 'client_side', location: 'how_it_works_screenshot' })}
                      className="group block"
                      aria-label="See the client side of Empath"
                    >
                      <PhoneScreenshot
                        src="/app-screens/home-journals.webp"
                        alt="Empath iOS app Journals list with titled entries, tags, and colors that reflect the emotion of each entry"
                        className="w-[220px]"
                      />
                      <p className="text-center text-xs text-stone-500 mt-3 group-hover:text-[#1b8af1] transition-colors">Or in the Empath app</p>
                    </Link>
                  </div>
                  <ul className="mt-7 flex flex-wrap justify-center gap-2" aria-label="Ways a client can capture an entry">
                    {captureWays.map((way) => (
                      <li
                        key={way.label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-700"
                      >
                        <way.icon className="w-4 h-4 text-[#1b8af1]" aria-hidden="true" />
                        {way.label}
                      </li>
                    ))}
                  </ul>
                  <p className="text-center text-sm text-stone-500 font-semibold mt-5">
                    Empath captures and organizes. It doesn't counsel.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="md:order-2">
                  <span className={STEP_LABEL}>Step 02 · Empath, in the background</span>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-stone-900 mb-4">Continuous pattern synthesis</h3>
                  <p className="text-stone-600 leading-relaxed mb-5">
                    Empath synthesizes mood, voice tonality, and, when a client opts in, Apple Health data into a short
                    list of clinically relevant signals, not a raw data dump.
                  </p>
                  <p className="flex items-start gap-3 text-stone-700">
                    <Lock className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    Patterns, not transcripts, and your client decides what you see.
                  </p>
                </div>
                <div className="md:order-1">
                  <SignalsMock />
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div>
                  <span className={STEP_LABEL}>Step 03 · You, before the session</span>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-stone-900 mb-4">Your 3-minute pre-session brief</h3>
                  <p className="text-stone-600 leading-relaxed mb-5">
                    Open the dashboard, read the brief, and walk in already knowing what shifted this week. The session
                    itself stays entirely yours.
                  </p>
                  <button
                    type="button"
                    onClick={() => openSampleBrief('hero')}
                    className="inline-flex items-center gap-1 text-[#1b8af1] font-semibold hover:underline cursor-pointer"
                  >
                    Read a full sample brief
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <BriefMock />
                </div>
              </div>
            </div>

            {/* Loop back */}
            <div className="mt-16 flex justify-center">
              <span className="inline-flex items-center gap-3 rounded-full bg-white border border-stone-200 px-5 py-3 text-sm text-stone-700 font-semibold text-center">
                <Repeat className="w-5 h-5 text-[#1b8af1] flex-shrink-0" aria-hidden="true" />
                A session that lands makes clients keep sharing, so next week's brief is richer
              </span>
            </div>

            {/* Both sides */}
            <div className="grid md:grid-cols-2 gap-8 mt-14">
              <div className="bg-white rounded-3xl border border-stone-200 shadow-soft p-7">
                <h3 className="text-lg font-semibold text-stone-900 mb-4">What your client gets</h3>
                <ul className="space-y-3">
                  {[
                    'A place to put the week down as it happens, instead of reconstructing it on the couch',
                    'Somewhere to say it at 10 PM that keeps it for Thursday',
                    'Control over exactly what reaches their therapist',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-stone-700">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-3xl border border-stone-200 shadow-soft p-7">
                <h3 className="text-lg font-semibold text-stone-900 mb-4">What you get</h3>
                <ul className="space-y-3">
                  {[
                    'The first fifteen minutes back, because catch-up already happened',
                    'Patterns across weeks that no single session can surface',
                    'More of the hour for the work only a human can do',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-stone-700">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-center text-stone-500 text-sm mt-8 max-w-2xl mx-auto">
              Empath never diagnoses, never sits in on the session, and never replaces it. It supplements the work so
              that more of it happens.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 5. TRUST BLOCK ============ */}
      <section className="py-24 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className={EYEBROW}>Safety and privacy</p>
              <h2 className={H2}>Built so you're never on call</h2>
              <p className={SECTION_SUB}>
                A between-session tool should lower your load, not add a duty to watch. Here is exactly where the lines
                are.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trustPoints.map((point) => (
                <div key={point.title} className="bg-[#FAF9F6] rounded-3xl border border-stone-200 p-7">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${point.tint}`}>
                    <point.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">{point.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{point.body}</p>
                </div>
              ))}
              <Link
                to="/transparency"
                className="bg-stone-900 text-white rounded-3xl p-7 flex flex-col justify-between hover:bg-[#1b8af1] transition-colors group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-white/10">
                    <BookOpen className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Read the Transparency Pledge</h3>
                  <p className="text-stone-300 group-hover:text-white leading-relaxed">
                    How client data is stored, who can see it, and what we will never do with it.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 font-semibold mt-5">
                  Open the pledge <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. CLINICAL FEATURES ============ */}
      <section className="py-24 bg-[#FAF9F6] border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={H2}>Clinical superpowers, not gimmicks</h2>
              <p className={SECTION_SUB}>
                Built with practicing therapists. Each feature earns its place by giving back time or context, never at
                the client's expense.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white p-8 rounded-3xl border border-stone-200 shadow-soft"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.tint}`}>
                    <feature.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-semibold text-stone-900 mb-3">{feature.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Named dashboard tools, each shown and explained in plain English */}
            <div className="mt-20">
              <h3 className="text-2xl md:text-3xl font-medium text-stone-900 text-center mb-3 font-serif">
                Also inside your dashboard
              </h3>
              <p className="text-stone-600 text-center max-w-2xl mx-auto mb-12">
                Three tools for the moments a brief raises a question.
              </p>
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div>
                  <StandOutMock />
                  <h4 className="text-lg font-semibold text-stone-900 mt-6 mb-1">What Stands Out</h4>
                  <p className="text-stone-600">Mood swings, lows, and recurring triggers, linked to entries.</p>
                </div>
                <div>
                  <AskDataMock />
                  <h4 className="text-lg font-semibold text-stone-900 mt-6 mb-1">Ask-your-data chat</h4>
                  <p className="text-stone-600">Ask about a client's shared entries, get cited answers.</p>
                </div>
                <div>
                  <CaseCompassMock />
                  <h4 className="text-lg font-semibold text-stone-900 mt-6 mb-1">Case Compass</h4>
                  <p className="text-stone-600">Session prep: focus, hypotheses, interventions, and homework ideas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE CHATGPT COMPARISON (compact) ============ */}
      <section className="py-20 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className={EYEBROW}>The comparison clients are already making</p>
              <h2 className="text-2xl md:text-4xl font-medium text-stone-900 tracking-tight font-serif">
                Your clients compare you to ChatGPT on memory. Flip the comparison.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#FAF9F6] rounded-3xl border border-stone-200 p-6">
                <h3 className="text-lg font-semibold text-stone-900 mb-4">ChatGPT alone</h3>
                <ul className="space-y-3 text-stone-700">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    Recalls everything a client has ever typed
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    Available at any hour
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    No license, no attunement, no duty of care
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-3xl border border-blue-200 shadow-lift p-6">
                <h3 className="text-lg font-semibold text-stone-900 mb-4">You + Empath</h3>
                <ul className="space-y-3 text-stone-700">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    AI-level memory and pattern recognition, in a 3-minute brief
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    Clinical training, attunement, and a real therapeutic alliance
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-stone-600 leading-relaxed mt-8 text-center max-w-3xl mx-auto">
              You can't win a memory contest against something that never forgets. Once Empath closes that gap,{' '}
              <span className="font-semibold text-stone-900">
                the comparison stops being about who remembers more and starts being about who understands better.
              </span>{' '}
              That's the fight you already win.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 7. TESTIMONIALS ============ */}
      <section className="py-24 bg-[#FAF9F6] border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className={`${H2} text-center mb-16`}>What therapists are saying</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <figure className={`${CARD} bg-white flex flex-col m-0`}>
                <blockquote className="font-serif text-lg text-stone-800 leading-relaxed flex-grow">
                  "Great therapy starts with understanding. But currently, therapists only get a glimpse into their clients' lives during hour-long sessions. <br />Empath is bridging this gap by helping clients document their experiences through journaling, health data, and mood tracking between sessions. This gives therapists a more complete picture of their clients' journeys before they meet."
                </blockquote>
                <figcaption className="mt-6 border-t border-stone-200 pt-4 flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center flex-shrink-0">
                    <UserRound className="w-5 h-5 text-stone-500" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-stone-900">Arjun Nanda</span>
                    <span className="block text-sm text-stone-500">Psychiatrist &nbsp;|&nbsp; Host of The Mental Health Forecast</span>
                  </span>
                </figcaption>
              </figure>

              <figure className={`${CARD} bg-white flex flex-col m-0`}>
                <blockquote className="font-serif text-lg text-stone-800 leading-relaxed flex-grow">
                  "Most sessions are spent catching up. Intake forms and assessments only go so far, ongoing life experiences, highs and lows, and even subtle details matter. Empath helps capture this and enhance sessions."
                </blockquote>
                <figcaption className="mt-6 border-t border-stone-200 pt-4 flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center flex-shrink-0">
                    <UserRound className="w-5 h-5 text-stone-500" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-stone-900">Mabel Yiu, LMFT</span>
                    <span className="block text-sm text-stone-500">Marriage and Family Therapist &nbsp;|&nbsp; Advisory Board Member</span>
                  </span>
                </figcaption>
              </figure>
            </div>

            <div className="text-center">
              <Link
                to="/advisory"
                className="inline-flex items-center gap-1 text-stone-900 font-semibold hover:text-[#1b8af1] transition-colors"
              >
                Interested in shaping the product as a clinical advisor? Learn about our Advisory Program
                <ChevronRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 8. OFFER + PRICING (per client seat) ============ */}
      <section ref={pricingRef} id="pricing" className="py-24 bg-white border-b border-stone-200 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className={H2}>Simple pricing, per client</h2>
              <p className={SECTION_SUB}>
                Start free with two client seats. Add a seat whenever a new client connects. No contracts, no
                per-practice fee.
              </p>
            </div>

            {/* Current offer: the single place to edit when the offer changes.
                Wording matches the therapist outreach email. */}
            <div className="bg-[#EEF5FE] rounded-3xl border border-blue-100 p-7 md:p-8 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center flex-shrink-0">
                  <Gift className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-stone-900">What you get when you start now</h3>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {offerItems.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <span className="block font-semibold text-stone-900">{item.title}</span>
                      <span className="block text-sm text-stone-600 mt-0.5">{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-3xl border border-stone-200 bg-[#FAF9F6] p-8 shadow-soft flex flex-col">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">Free, forever</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-medium text-stone-900 font-serif">$0</span>
                  <span className="text-stone-500">/ month</span>
                </div>
                <p className="text-stone-600 mb-6">Two client seats with everything included.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    'Weekly brief and What Stands Out, the mood shifts worth raising',
                    'Mood, journal, and health timelines',
                    "Ask-your-data chat, for questions about a client's entries",
                    'Case Compass, session prep ideas that cite entries',
                    'Connect code, email invites, and your practice branding',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#1b8af1] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-stone-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={THERAPIST_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEarlyAccess('pricing')}
                  className={PRIMARY_BTN}
                  aria-label="Get early access: book a call"
                >
                  Get early access
                </a>
              </div>

              <div className="rounded-3xl bg-stone-900 text-white p-8 shadow-lift flex flex-col">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-300 mb-3">Additional seats</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-medium font-serif">$9.99</span>
                  <span className="text-stone-300">/ client / month</span>
                </div>
                <p className="text-stone-300 mb-6">Add a seat the moment a third client connects. Remove it when they finish.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    'Everything in free, for every client',
                    'Add or remove seats any time from your dashboard',
                    'Prorated: pay only for the days a seat is active',
                    'Invoices and card managed through Stripe',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-white shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-stone-100">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={DASHBOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 bg-white text-stone-900 rounded-full hover:bg-stone-100 transition-colors font-semibold inline-flex items-center justify-center"
                  aria-label="Sign in to add client seats"
                >
                  Add seats in your dashboard
                </a>
              </div>
            </div>

            <div className="text-center text-sm text-stone-500 mt-10 space-y-2">
              <p>A seat is one client. Pending invitations count toward your seats; removing a client frees theirs immediately.</p>
              <p>
                Your clients pay nothing to connect with you. The Empath app is free for them, and any Empath+
                subscription is their own optional choice.
              </p>
              <p>
                <Link to="/transparency" className="text-[#1b8af1] font-semibold hover:underline">
                  Read our Transparency Pledge on client data
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 9. FAQ ============ */}
      <section id="faq" className="py-24 bg-[#FAF9F6] border-b border-stone-200 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-medium text-center text-stone-900 mb-12 font-serif tracking-tight">
            Questions therapists ask us
          </h2>
          <div className="bg-white rounded-3xl border border-stone-200 shadow-soft px-6 md:px-8">
            {faqs.map((item) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-stone-600 mb-4">Something we didn't cover?</p>
            <button
              type="button"
              onClick={() => openSupportChat('Question about Empath for my practice: ')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 bg-white text-stone-900 hover:border-stone-900 transition-colors cursor-pointer font-semibold"
            >
              <MessageSquare className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
              Ask us in chat
            </button>
          </div>
        </div>
      </section>

      {/* ============ 10. FINAL CALL TO ACTION ============ */}
      <section className="px-4 py-24 bg-[#FAF9F6]">
        <div className="container mx-auto max-w-5xl rounded-[2rem] bg-stone-900 text-white px-6 py-16 md:px-16 md:py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium mb-6 tracking-tight font-serif">
              Level the playing field on data. Let your human empathy do the rest.
            </h2>
            <p className="text-xl text-stone-300 mb-10 leading-relaxed">
              See how a 3-minute brief changes the way you walk into session. Two client seats are free forever.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
              <a
                href={THERAPIST_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEarlyAccess('final')}
                className="flex-1 px-7 py-3.5 bg-white text-stone-900 rounded-full font-semibold text-lg hover:bg-stone-100 transition-colors inline-flex items-center justify-center gap-2"
                aria-label="Get early access: book a call"
              >
                Get early access
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => openSampleBrief('final')}
                className="flex-1 px-7 py-3.5 bg-transparent text-white rounded-full font-semibold text-lg border border-white/40 hover:border-white transition-colors inline-flex items-center justify-center cursor-pointer"
              >
                See a sample brief
              </button>
            </div>
          </div>
        </div>
      </section>

      <TherapistFooter />

      {/* Sample pre-session brief modal */}
      {showSampleBrief && (
        <div
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sample-brief-modal-title"
          onClick={() => setShowSampleBrief(false)}
        >
          <div
            className="bg-white rounded-3xl border border-stone-200 shadow-lift p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 id="sample-brief-modal-title" className="text-2xl font-medium text-stone-900 font-serif">Sample pre-session brief</h2>
                <p className="text-sm text-stone-500 mt-1">Client: J.M. &middot; Session 12 &middot; Illustrative example, not a real client</p>
              </div>
              <button
                type="button"
                onClick={() => setShowSampleBrief(false)}
                className="text-stone-400 hover:text-stone-900 rounded-full p-2 transition-colors cursor-pointer flex-shrink-0"
                aria-label="Close sample brief"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Mood trend</p>
                  <p className="text-stone-600 text-sm leading-relaxed mt-0.5">Steadier this week overall, with two rough days midweek that lined up with a poor night's sleep on Wednesday.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Sleep & activity</p>
                  <p className="text-stone-600 text-sm leading-relaxed mt-0.5">Average sleep dropped to 5.4 hrs from a 7.1 hr baseline; step count down about 40% since last session.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">People mentioned</p>
                  <p className="text-stone-600 text-sm leading-relaxed mt-0.5">Older sibling came up three times this week, with a noticeably different tone each time.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Notable quote</p>
                  <p className="text-stone-600 text-sm leading-relaxed mt-0.5 italic">"I keep replaying the conversation with my brother and I don't know why it's bothering me this much."</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Suggested focus</p>
                  <p className="text-stone-600 text-sm leading-relaxed mt-0.5">Consider opening with the sibling dynamic before returning to sleep hygiene.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
              <p className="text-xs text-stone-500 leading-relaxed">
                Generated from your client's WhatsApp and Telegram check-ins and voice notes between sessions. You decide what surfaces before every appointment.
              </p>
              <a
                href={THERAPIST_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture('therapist_cta_clicked', { cta: 'early_access', location: 'sample_brief' })}
                className="px-6 py-3 bg-stone-900 text-white rounded-full hover:bg-[#1b8af1] transition-colors font-semibold text-sm whitespace-nowrap text-center"
              >
                Get early access
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating live-chat entry point (Crisp loads lazily on first click) */}
      <button
        type="button"
        onClick={() => openSupportChat('Question about Empath for my practice: ')}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-stone-900 text-white shadow-lift hover:bg-[#1b8af1] transition-colors cursor-pointer text-sm font-semibold"
        aria-label="Chat with us about Empath for your practice"
      >
        <MessageSquare className="w-5 h-5" aria-hidden="true" />
        Questions? Chat with us
      </button>
    </div>
  );
}
