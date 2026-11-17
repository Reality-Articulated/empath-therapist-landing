import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import posthog from 'posthog-js';
import SEO from '../components/SEO';
import FAQItem from '../components/FAQItem';
import TherapistHeader from '../components/therapist/TherapistHeader';
import TherapistFooter from '../components/therapist/TherapistFooter';
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
  Mail,
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
} from 'lucide-react';

// "Get a demo" request form. Google Calendar appointment schedules need a paid
// Workspace plan, so the modal posts to empath-heroku, which emails the request
// to Div (routes/demoRequest/demoRequest.js) for a manual follow-up.
const DEMO_REQUEST_ENDPOINT = 'https://app.empathdash.com/api/demo-request';
const DEMO_CHAT_PREFILL = "Hi! I'd like to book a 15-minute Empath demo. A few times that work for me: ";
const DASHBOARD_URL = 'https://app.empathdash.com/';
const APP_STORE_URL = 'https://apps.apple.com/us/app/empath-ai-diary-for-your-mind/id6472873287';

// Shared class strings: the consumer homepage's design language (cream and
// white bands, stone-black type, serif headlines, 2px borders, hard offset
// shadows, #1b8af1 accent).
const PRIMARY_BTN =
  'px-6 py-4 bg-stone-900 text-white rounded-xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1b8af1] transition-all duration-200 font-bold inline-flex items-center justify-center gap-2 text-base cursor-pointer';
const SECONDARY_BTN =
  'px-6 py-4 bg-white text-stone-900 rounded-xl border-2 border-stone-200 hover:border-stone-900 transition-all duration-200 font-bold inline-flex items-center justify-center gap-2 text-base cursor-pointer';
const H2 = 'text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif';
const SECTION_SUB = 'text-lg text-stone-600 font-medium max-w-2xl mx-auto';
const EYEBROW = 'text-xs md:text-sm text-stone-500 font-bold mb-5 tracking-widest uppercase';
const CARD =
  'bg-[#FAF9F6] p-8 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)]';
const STEP_LABEL =
  'inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-wider rounded mb-4';

type DemoFormState = 'idle' | 'sending' | 'sent' | 'error';

function DemoRequestForm({ onChat }: { onChat: () => void }) {
  const [state, setState] = useState<DemoFormState>('idle');
  const [errorText, setErrorText] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', practice: '', times: '', message: '', website: '' });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setErrorText(null);
    posthog.capture('therapist_demo_requested', { has_times: !!form.times.trim(), has_practice: !!form.practice.trim() });
    try {
      const res = await fetch(DEMO_REQUEST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'therapist_page' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "We couldn't send your request. Please try the chat instead.");
      }
      posthog.capture('therapist_demo_sent');
      setState('sent');
    } catch (err) {
      posthog.capture('therapist_demo_failed', { message: err instanceof Error ? err.message : String(err) });
      setErrorText(err instanceof Error ? err.message : "We couldn't send your request. Please try the chat instead.");
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="text-center py-6">
        <div className="mx-auto w-14 h-14 rounded-xl bg-green-100 border-2 border-green-200 flex items-center justify-center mb-4">
          <Check className="w-7 h-7 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-stone-900 mb-2">Request received</h3>
        <p className="text-stone-600 font-medium max-w-md mx-auto">
          Thanks, {form.name.trim() || 'there'}. Div will email you at {form.email.trim()} within a day to confirm a time.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-lg border-2 border-stone-200 px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900';
  const labelClass = 'block text-sm font-bold text-stone-700 mb-1.5';

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-4" noValidate>
      <p className="md:col-span-2 text-stone-600 font-medium leading-relaxed">
        Fifteen minutes with Div, Empath's founder: a walk through the client experience and your dashboard, then your questions.
        Leave your details and a few times that work, and you'll hear back within a day.
      </p>
      <label className="block">
        <span className={labelClass}>Name <span aria-hidden="true" className="text-rose-500">*</span></span>
        <input className={inputClass} name="name" autoComplete="name" required value={form.name} onChange={update('name')} />
      </label>
      <label className="block">
        <span className={labelClass}>Email <span aria-hidden="true" className="text-rose-500">*</span></span>
        <input className={inputClass} type="email" name="email" autoComplete="email" required value={form.email} onChange={update('email')} />
      </label>
      <label className="block">
        <span className={labelClass}>Practice <span className="text-stone-400 font-medium">(optional)</span></span>
        <input className={inputClass} name="practice" autoComplete="organization" value={form.practice} onChange={update('practice')} />
      </label>
      <label className="block">
        <span className={labelClass}>Times that work <span className="text-stone-400 font-medium">(with time zone)</span></span>
        <input className={inputClass} name="times" placeholder="e.g. Tue or Thu after 2pm ET" value={form.times} onChange={update('times')} />
      </label>
      <label className="block md:col-span-2">
        <span className={labelClass}>Anything you want covered <span className="text-stone-400 font-medium">(optional)</span></span>
        <textarea className={`${inputClass} min-h-[88px]`} name="message" value={form.message} onChange={update('message')} />
      </label>
      {/* Honeypot: hidden from people, filled by bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
        </label>
      </div>
      {state === 'error' && errorText && (
        <p role="alert" className="md:col-span-2 text-sm font-medium text-rose-600">{errorText}</p>
      )}
      <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 sm:items-center mt-1">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-white border-2 border-stone-900 hover:bg-[#1b8af1] hover:border-[#1b8af1] transition-colors disabled:opacity-60 disabled:cursor-wait cursor-pointer font-bold"
        >
          <Mail className="w-5 h-5" aria-hidden="true" />
          {state === 'sending' ? 'Sending…' : 'Request my demo'}
        </button>
        <button
          type="button"
          onClick={onChat}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-stone-200 text-stone-900 hover:border-stone-900 transition-colors cursor-pointer font-bold"
        >
          <MessageSquare className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
          Chat with us instead
        </button>
      </div>
    </form>
  );
}

const proofStats = [
  { value: '650+', label: 'people journaling on Empath' },
  { value: '2,000+', label: 'journal entries captured' },
  { value: '45', label: 'languages supported' },
];

const trustPoints = [
  {
    icon: BellOff,
    tint: 'bg-blue-100 border-blue-200 text-blue-600',
    title: 'Not a monitoring system',
    body: 'Empath is a journaling and reflection tool. You are never on call and never expected to watch entries between sessions. The brief waits for you until you prepare for the appointment.',
  },
  {
    icon: Lock,
    tint: 'bg-purple-100 border-purple-200 text-purple-600',
    title: 'Clients control what is shared',
    body: 'Every connection needs the client\'s approval, they choose exactly what reaches you, and entries they lock never leave their journal.',
  },
  {
    icon: LifeBuoy,
    tint: 'bg-rose-100 border-rose-200 text-rose-600',
    title: 'Crisis help is crisis services',
    body: 'If a client is in crisis, the app directs them to call 911 or the 988 Suicide and Crisis Lifeline (US). Crisis help is those services, not a journal entry.',
  },
  {
    icon: ShieldCheck,
    tint: 'bg-green-100 border-green-200 text-green-600',
    title: 'Encrypted, never used to train AI',
    body: 'Client data is encrypted at rest and in transit, and none of it is used to train AI models.',
  },
  {
    icon: FileText,
    tint: 'bg-amber-100 border-amber-200 text-amber-600',
    title: 'Straight about HIPAA',
    body: 'Empath is not currently HIPAA certified. Use it as a supplementary reflection tool alongside your clinical records, not as a system of record.',
  },
];

const features = [
  {
    icon: Clock,
    tint: 'bg-amber-100 border-amber-200 text-amber-600',
    title: 'Pre-Session Catch-Up Summaries',
    description: "Save the 15 minutes you'd otherwise spend re-orienting. Every brief opens with what changed since the last session, not a blank page.",
  },
  {
    icon: Users,
    tint: 'bg-blue-100 border-blue-200 text-blue-600',
    title: 'People & Relationship Insights',
    description: "See which relationships track with a client's emotional volatility over time, so you can raise it before they do.",
  },
  {
    icon: HeartPulse,
    tint: 'bg-rose-100 border-rose-200 text-rose-600',
    title: 'Biometric & Mood Synthesis',
    description: 'When a client opts into Apple Health, Empath lines up sleep, activity, and heart-rate variability against mood, so a rough week reads as data, not a mystery.',
  },
  {
    icon: Building2,
    tint: 'bg-purple-100 border-purple-200 text-purple-600',
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
  const [showCalendar, setShowCalendar] = useState(false);
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

  const trackStartFree = (location: CtaLocation) => {
    posthog.capture('therapist_cta_clicked', { cta: 'start_free', location });
  };

  const openSampleBrief = (location: CtaLocation) => {
    posthog.capture('therapist_cta_clicked', { cta: 'sample_brief', location });
    posthog.capture('therapist_sample_brief_opened', { location });
    setShowSampleBrief(true);
  };

  const openDemo = (location: CtaLocation) => {
    posthog.capture('therapist_cta_clicked', { cta: 'demo', location });
    setShowCalendar(true);
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
      <section className="relative bg-white pt-16 md:pt-20 pb-16 overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <p className={EYEBROW}>For private practice therapists and group practices</p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter text-stone-900 mb-7 leading-[1.12] font-serif">
            Stop spending the first 15 minutes of every session{' '}
            <span className="relative inline-block px-3 whitespace-nowrap">
              <span className="absolute inset-0 bg-[#1b8af1] -rotate-1 rounded-sm shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]"></span>
              <span className="relative text-white">playing catch-up.</span>
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-stone-600 mb-9 max-w-3xl mx-auto leading-relaxed font-medium">
            Empath turns your client's life between sessions into a 3-minute brief, captured with zero friction over
            WhatsApp, Telegram, or a quick voice call, so your human judgment does the rest.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackStartFree('hero')}
              className={`${PRIMARY_BTN} flex-1`}
              aria-label="Start free with two client seats, no card needed"
            >
              Start free
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <button type="button" onClick={() => openSampleBrief('hero')} className={`${SECONDARY_BTN} flex-1`}>
              See a sample brief
            </button>
          </div>
          <p className="text-sm text-stone-500 font-medium mt-4">
            2 client seats free forever. No card.{' '}
            <button
              type="button"
              onClick={() => openDemo('hero')}
              className="text-[#1b8af1] font-bold hover:underline cursor-pointer"
            >
              Prefer a walkthrough? Book a 15-minute demo
            </button>
          </p>
        </div>

        {/* The product, shown once and clearly: a replica of the client view a
            therapist opens before a session (fictional client). */}
        <div className="container mx-auto px-4 mt-14">
          <DashboardPreview />
          <p className="text-center text-xs text-stone-400 font-medium mt-6">
            Your dashboard before a session. Illustrative example, not a real client.
          </p>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="py-5 bg-white border-y-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-x-8 gap-y-3 flex-wrap">
            <div className="flex items-center gap-2 text-stone-700">
              <ShieldCheck className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
              <span className="font-bold text-sm">Encrypted at rest and in transit</span>
            </div>
            <span className="text-stone-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-2 text-stone-700">
              <FileCheck className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
              <span className="font-bold text-sm">Clients control what's shared</span>
            </div>
            <span className="text-stone-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-2 text-stone-700">
              <Ban className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
              <span className="font-bold text-sm">Zero data used for AI training</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. PROOF STRIP ============ */}
      {/* Real, current figures only. Update them here or remove the strip;
          never let them go stale. */}
      <section className="py-14 bg-[#FAF9F6] border-b-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
            {proofStats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border-2 border-stone-900 px-5 py-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-stone-900 font-serif">{stat.value}</div>
                <div className="text-sm text-stone-600 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-900 text-white rounded-xl border-2 border-stone-900 px-5 py-6 flex flex-col items-center justify-center text-center hover:bg-[#1b8af1] hover:border-[#1b8af1] transition-colors"
              aria-label="Empath is live on the App Store"
            >
              <svg className="w-8 h-8 mb-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              <div className="text-sm font-bold">Live on the App Store</div>
              <div className="text-xs text-stone-300 font-medium mt-0.5">The app your clients use</div>
            </a>
          </div>
        </div>
      </section>

      {/* ============ 3. THE 167-HOUR BLACK HOLE ============ */}
      <section className="py-24 bg-white border-b-2 border-stone-200">
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
              <div className="bg-[#FAF9F6] rounded-xl border-2 border-stone-200 p-7">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">Session recall alone</h3>
                    <p className="text-sm text-stone-600 font-medium mt-1">
                      Whatever a client remembers to mention, filtered by how they feel in the room that day.
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-black text-rose-600 font-serif">1 hr</div>
                    <div className="text-xs text-stone-500 font-medium">of the week</div>
                  </div>
                </div>
                <div className="h-10 bg-white border-2 border-stone-200 rounded-lg flex items-center px-2 mb-5" aria-hidden="true">
                  <div className="w-1.5 h-6 bg-stone-900 rounded-sm"></div>
                  <span className="ml-3 text-xs text-stone-400 font-medium">1 hour of direct observation</span>
                </div>
                <p className="text-sm text-stone-700 font-medium leading-relaxed">
                  <span className="font-bold text-stone-900">Recall bias does the rest.</span> Triggers, avoidant
                  patterns, and small breakthroughs get smoothed over or forgotten entirely.
                </p>
              </div>

              <div className="bg-white rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_#1b8af1] p-7">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">With Empath</h3>
                    <p className="text-sm text-stone-600 font-medium mt-1">
                      Captured in the moment, with no extra effort from your client.
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-black text-[#1b8af1] font-serif">168 hrs</div>
                    <div className="text-xs text-stone-500 font-medium">in view</div>
                  </div>
                </div>
                <div className="h-10 bg-[#1b8af1] border-2 border-stone-900 rounded-lg flex items-center justify-center px-2 mb-5" aria-hidden="true">
                  <span className="text-xs text-white font-bold">Sleep, mood, relationships, and triggers, as they happen</span>
                </div>
                <p className="text-sm text-stone-700 font-medium leading-relaxed">
                  <span className="font-bold text-stone-900">No homework required.</span> Clients text or voice-note
                  through a channel they already have open, so the data shows up without them trying harder.
                </p>
              </div>
            </div>

            <p className="text-center text-lg text-stone-600 font-medium mt-12 max-w-2xl mx-auto">
              From a single snapshot to the full week: your clinical judgment works with{' '}
              <span className="font-bold text-stone-900">real context, not a client's best guess at recall.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ============ 4. HOW IT WORKS (merged with "How It All Fits Together") ============ */}
      <section id="how-it-works" className="py-24 bg-[#FAF9F6] border-b-2 border-stone-200 scroll-mt-20">
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
                  <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">Zero-friction client capture</h3>
                  <p className="text-stone-600 font-medium leading-relaxed mb-5">
                    Clients log life as it happens over WhatsApp, Telegram, or a quick voice call. Apps they already
                    open, so it keeps happening, and homework compliance holds.
                  </p>
                  <p className="flex items-start gap-3 text-stone-700 font-medium">
                    <Languages className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    Clients journal in their own language, with 45 supported.
                  </p>
                </div>
                <div>
                  <CapturePhoneMock />
                  <p className="text-center text-sm text-stone-500 font-bold mt-5">
                    Empath captures and organizes. It doesn't counsel.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="md:order-2">
                  <span className={STEP_LABEL}>Step 02 · Empath, in the background</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">Continuous pattern synthesis</h3>
                  <p className="text-stone-600 font-medium leading-relaxed mb-5">
                    Empath synthesizes mood, voice tonality, and, when a client opts in, Apple Health data into a short
                    list of clinically relevant signals, not a raw data dump.
                  </p>
                  <p className="flex items-start gap-3 text-stone-700 font-medium">
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
                  <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">Your 3-minute pre-session brief</h3>
                  <p className="text-stone-600 font-medium leading-relaxed mb-5">
                    Open the dashboard, read the brief, and walk in already knowing what shifted this week. The session
                    itself stays entirely yours.
                  </p>
                  <button
                    type="button"
                    onClick={() => openSampleBrief('hero')}
                    className="inline-flex items-center gap-1 text-[#1b8af1] font-bold hover:underline cursor-pointer"
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
              <span className="inline-flex items-center gap-3 rounded-xl bg-white border-2 border-stone-200 px-5 py-3 text-sm text-stone-700 font-bold text-center">
                <Repeat className="w-5 h-5 text-[#1b8af1] flex-shrink-0" aria-hidden="true" />
                A session that lands makes clients keep sharing, so next week's brief is richer
              </span>
            </div>

            {/* Both sides */}
            <div className="grid md:grid-cols-2 gap-8 mt-14">
              <div className="bg-white rounded-xl border-2 border-stone-200 p-7">
                <h3 className="text-lg font-bold text-stone-900 mb-4">What your client gets</h3>
                <ul className="space-y-3">
                  {[
                    'A place to put the week down as it happens, instead of reconstructing it on the couch',
                    'Somewhere to say it at 10 PM that keeps it for Thursday',
                    'Control over exactly what reaches their therapist',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-stone-700 font-medium">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl border-2 border-stone-200 p-7">
                <h3 className="text-lg font-bold text-stone-900 mb-4">What you get</h3>
                <ul className="space-y-3">
                  {[
                    'The first fifteen minutes back, because catch-up already happened',
                    'Patterns across weeks that no single session can surface',
                    'More of the hour for the work only a human can do',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-stone-700 font-medium">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-center text-stone-500 text-sm font-medium mt-8 max-w-2xl mx-auto">
              Empath never diagnoses, never sits in on the session, and never replaces it. It supplements the work so
              that more of it happens.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 5. TRUST BLOCK ============ */}
      <section className="py-24 bg-white border-b-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-800 border-2 border-blue-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_#1b8af1]">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" /> Safety and privacy
              </div>
              <h2 className={H2}>Built so you're never on call</h2>
              <p className={SECTION_SUB}>
                A between-session tool should lower your load, not add a duty to watch. Here is exactly where the lines
                are.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trustPoints.map((point) => (
                <div key={point.title} className="bg-[#FAF9F6] rounded-xl border-2 border-stone-200 p-7">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border-2 ${point.tint}`}>
                    <point.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">{point.title}</h3>
                  <p className="text-stone-600 font-medium leading-relaxed">{point.body}</p>
                </div>
              ))}
              <Link
                to="/transparency"
                className="bg-stone-900 text-white rounded-xl border-2 border-stone-900 p-7 flex flex-col justify-between hover:bg-[#1b8af1] hover:border-[#1b8af1] transition-colors group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border-2 border-white/30 bg-white/10">
                    <BookOpen className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Read the Transparency Pledge</h3>
                  <p className="text-stone-300 group-hover:text-white font-medium leading-relaxed">
                    How client data is stored, who can see it, and what we will never do with it.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 font-bold mt-5">
                  Open the pledge <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. CLINICAL FEATURES ============ */}
      <section className="py-24 bg-[#FAF9F6] border-b-2 border-stone-200">
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
                  className="bg-white p-8 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] hover:shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 border-2 ${feature.tint}`}>
                    <feature.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-3">{feature.title}</h3>
                  <p className="text-stone-600 leading-relaxed font-medium">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Named dashboard tools, each shown and explained in plain English */}
            <div className="mt-20">
              <h3 className="text-2xl md:text-3xl font-black text-stone-900 text-center mb-3 font-serif">
                Also inside your dashboard
              </h3>
              <p className="text-stone-600 font-medium text-center max-w-2xl mx-auto mb-12">
                Three tools for the moments a brief raises a question.
              </p>
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div>
                  <StandOutMock />
                  <h4 className="text-lg font-bold text-stone-900 mt-6 mb-1">What Stands Out</h4>
                  <p className="text-stone-600 font-medium">Mood swings, lows, and recurring triggers, linked to entries.</p>
                </div>
                <div>
                  <AskDataMock />
                  <h4 className="text-lg font-bold text-stone-900 mt-6 mb-1">Ask-your-data chat</h4>
                  <p className="text-stone-600 font-medium">Ask about a client's shared entries, get cited answers.</p>
                </div>
                <div>
                  <CaseCompassMock />
                  <h4 className="text-lg font-bold text-stone-900 mt-6 mb-1">Case Compass</h4>
                  <p className="text-stone-600 font-medium">Session prep: focus, hypotheses, interventions, and homework ideas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE CHATGPT COMPARISON (compact) ============ */}
      <section className="py-20 bg-white border-b-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className={EYEBROW}>The comparison clients are already making</p>
              <h2 className="text-2xl md:text-4xl font-black text-stone-900 tracking-tight font-serif">
                Your clients compare you to ChatGPT on memory. Flip the comparison.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#FAF9F6] rounded-xl border-2 border-stone-200 p-6">
                <h3 className="text-lg font-bold text-stone-900 mb-4">ChatGPT alone</h3>
                <ul className="space-y-3 text-stone-700 font-medium">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    Recalls everything a client has ever typed
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    Available at any hour
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    No license, no attunement, no duty of care
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1b8af1] p-6">
                <h3 className="text-lg font-bold text-stone-900 mb-4">You + Empath</h3>
                <ul className="space-y-3 text-stone-700 font-medium">
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

            <p className="text-stone-600 font-medium leading-relaxed mt-8 text-center max-w-3xl mx-auto">
              You can't win a memory contest against something that never forgets. Once Empath closes that gap,{' '}
              <span className="font-bold text-stone-900">
                the comparison stops being about who remembers more and starts being about who understands better.
              </span>{' '}
              That's the fight you already win.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 7. TESTIMONIALS ============ */}
      <section className="py-24 bg-[#FAF9F6] border-b-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className={`${H2} text-center mb-16`}>What therapists are saying</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <figure className={`${CARD} bg-white flex flex-col m-0`}>
                <blockquote className="text-lg text-stone-700 font-medium leading-relaxed flex-grow">
                  "Great therapy starts with understanding. But currently, therapists only get a glimpse into their clients' lives during hour-long sessions. <br />Empath is bridging this gap by helping clients document their experiences through journaling, health data, and mood tracking between sessions. This gives therapists a more complete picture of their clients' journeys before they meet."
                </blockquote>
                <figcaption className="mt-6 border-t-2 border-stone-200 pt-4 flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-stone-100 border-2 border-stone-200 flex items-center justify-center flex-shrink-0">
                    <UserRound className="w-5 h-5 text-stone-500" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-bold text-stone-900">Arjun Nanda</span>
                    <span className="block text-sm text-stone-500 font-medium">Psychiatrist &nbsp;|&nbsp; Host of The Mental Health Forecast</span>
                  </span>
                </figcaption>
              </figure>

              <figure className={`${CARD} bg-white flex flex-col m-0`}>
                <blockquote className="text-lg text-stone-700 font-medium leading-relaxed flex-grow">
                  "Most sessions are spent catching up. Intake forms and assessments only go so far, ongoing life experiences, highs and lows, and even subtle details matter. Empath helps capture this and enhance sessions."
                </blockquote>
                <figcaption className="mt-6 border-t-2 border-stone-200 pt-4 flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-stone-100 border-2 border-stone-200 flex items-center justify-center flex-shrink-0">
                    <UserRound className="w-5 h-5 text-stone-500" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-bold text-stone-900">Mabel Yiu, LMFT</span>
                    <span className="block text-sm text-stone-500 font-medium">Marriage and Family Therapist &nbsp;|&nbsp; Advisory Board Member</span>
                  </span>
                </figcaption>
              </figure>
            </div>

            <div className="text-center">
              <Link
                to="/advisory"
                className="inline-flex items-center gap-1 text-stone-900 font-bold hover:text-[#1b8af1] transition-colors"
              >
                Interested in shaping the product as a clinical advisor? Learn about our Advisory Program
                <ChevronRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 8. OFFER + PRICING (per client seat) ============ */}
      <section ref={pricingRef} id="pricing" className="py-24 bg-white border-b-2 border-stone-200 scroll-mt-20">
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
            <div className="bg-amber-50 rounded-xl border-2 border-amber-900 shadow-[6px_6px_0px_0px_#f59e0b] p-7 md:p-8 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-11 h-11 rounded-xl bg-amber-100 border-2 border-amber-200 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-5 h-5 text-amber-600" aria-hidden="true" />
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-stone-900">What you get when you start now</h3>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {offerItems.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <span className="block font-bold text-stone-900">{item.title}</span>
                      <span className="block text-sm text-stone-600 font-medium mt-0.5">{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-xl border-2 border-stone-900 bg-[#FAF9F6] p-8 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] flex flex-col">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">Free, forever</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black text-stone-900 font-serif">$0</span>
                  <span className="text-stone-500 font-medium">/ month</span>
                </div>
                <p className="text-stone-600 font-medium mb-6">Two client seats with everything included.</p>
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
                      <span className="font-medium text-stone-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={DASHBOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackStartFree('pricing')}
                  className={PRIMARY_BTN}
                  aria-label="Create your free Empath therapist account"
                >
                  Start free
                </a>
              </div>

              <div className="rounded-xl border-2 border-stone-900 bg-stone-900 text-white p-8 shadow-[8px_8px_0px_0px_#1b8af1] flex flex-col">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-3">Additional seats</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black font-serif">$9.99</span>
                  <span className="text-stone-300 font-medium">/ client / month</span>
                </div>
                <p className="text-stone-300 font-medium mb-6">Add a seat the moment a third client connects. Remove it when they finish.</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    'Everything in free, for every client',
                    'Add or remove seats any time from your dashboard',
                    'Prorated: pay only for the days a seat is active',
                    'Invoices and card managed through Stripe',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-white shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-medium text-stone-100">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={DASHBOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-white text-stone-900 rounded-xl border-2 border-white hover:bg-stone-100 transition-colors font-bold inline-flex items-center justify-center"
                  aria-label="Sign in to add client seats"
                >
                  Add seats in your dashboard
                </a>
              </div>
            </div>

            <div className="text-center text-sm text-stone-500 mt-10 font-medium space-y-2">
              <p>A seat is one client. Pending invitations count toward your seats; removing a client frees theirs immediately.</p>
              <p>
                Your clients pay nothing to connect with you. The Empath app is free for them, and any Empath+
                subscription is their own optional choice.
              </p>
              <p>
                <Link to="/transparency" className="text-[#1b8af1] font-bold hover:underline">
                  Read our Transparency Pledge on client data
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 9. FAQ ============ */}
      <section id="faq" className="py-24 bg-[#FAF9F6] border-b-2 border-stone-200 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-center text-stone-900 mb-12 font-serif tracking-tight">
            Questions therapists ask us
          </h2>
          <div className="bg-white rounded-xl border-2 border-stone-200 px-6 md:px-8">
            {faqs.map((item) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-stone-600 font-medium mb-4">Something we didn't cover?</p>
            <button
              type="button"
              onClick={() => openSupportChat('Question about Empath for my practice: ')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-stone-200 bg-white text-stone-900 hover:border-stone-900 transition-colors cursor-pointer font-bold"
            >
              <MessageSquare className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
              Ask us in chat
            </button>
          </div>
        </div>
      </section>

      {/* ============ 10. FINAL CALL TO ACTION ============ */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight font-serif">
              Level the playing field on data. Let your human empathy do the rest.
            </h2>
            <p className="text-xl text-stone-300 mb-10 leading-relaxed font-medium">
              See how a 3-minute brief changes the way you walk into session. Two client seats are free forever.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackStartFree('final')}
                className="flex-1 px-6 py-4 bg-white text-stone-900 rounded-xl font-bold text-lg border-2 border-white shadow-[6px_6px_0px_0px_#1b8af1] hover:shadow-[4px_4px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center justify-center gap-2"
                aria-label="Get started with Empath for free"
              >
                Get started free
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => openSampleBrief('final')}
                className="flex-1 px-6 py-4 bg-transparent text-white rounded-xl font-bold text-lg border-2 border-white/40 hover:border-white transition-colors inline-flex items-center justify-center cursor-pointer"
              >
                See a sample brief
              </button>
            </div>
            <p className="text-sm text-stone-400 font-medium mt-6">
              <button
                type="button"
                onClick={() => openDemo('final')}
                className="text-white font-bold underline underline-offset-4 hover:text-[#1b8af1] cursor-pointer"
              >
                Prefer a walkthrough? Book a 15-minute demo
              </button>
            </p>
          </div>
        </div>
      </section>

      <TherapistFooter />

      {/* Demo request modal */}
      {showCalendar && (
        <div
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="calendar-modal-title"
        >
          <div className="bg-white rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_#1b8af1] p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 id="calendar-modal-title" className="text-2xl font-black text-stone-900 font-serif">Get a 15-minute demo</h2>
              <button
                type="button"
                onClick={() => setShowCalendar(false)}
                className="text-stone-400 hover:text-stone-900 rounded-full p-2 transition-colors cursor-pointer"
                aria-label="Close demo request"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <DemoRequestForm
              onChat={() => {
                posthog.capture('therapist_demo_chat_clicked');
                setShowCalendar(false);
                openSupportChat(DEMO_CHAT_PREFILL);
              }}
            />
          </div>
        </div>
      )}

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
            className="bg-white rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_#1b8af1] p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 id="sample-brief-modal-title" className="text-2xl font-black text-stone-900 font-serif">Sample pre-session brief</h2>
                <p className="text-sm text-stone-500 font-medium mt-1">Client: J.M. &middot; Session 12 &middot; Illustrative example, not a real client</p>
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
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-100 border-2 border-blue-200 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Mood trend</p>
                  <p className="text-stone-600 text-sm font-medium leading-relaxed mt-0.5">Steadier this week overall, with two rough days midweek that lined up with a poor night's sleep on Wednesday.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-100 border-2 border-green-200 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Sleep & activity</p>
                  <p className="text-stone-600 text-sm font-medium leading-relaxed mt-0.5">Average sleep dropped to 5.4 hrs from a 7.1 hr baseline; step count down about 40% since last session.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-100 border-2 border-purple-200 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">People mentioned</p>
                  <p className="text-stone-600 text-sm font-medium leading-relaxed mt-0.5">Older sibling came up three times this week, with a noticeably different tone each time.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 border-2 border-amber-200 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-amber-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Notable quote</p>
                  <p className="text-stone-600 text-sm font-medium leading-relaxed mt-0.5 italic">"I keep replaying the conversation with my brother and I don't know why it's bothering me this much."</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-rose-100 border-2 border-rose-200 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-rose-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Suggested focus</p>
                  <p className="text-stone-600 text-sm font-medium leading-relaxed mt-0.5">Consider opening with the sibling dynamic before returning to sleep hygiene.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t-2 border-stone-200 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
              <p className="text-xs text-stone-500 font-medium leading-relaxed">
                Generated from your client's WhatsApp and Telegram check-ins and voice notes between sessions. You decide what surfaces before every appointment.
              </p>
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture('therapist_cta_clicked', { cta: 'start_free', location: 'sample_brief' })}
                className="px-5 py-3 bg-stone-900 text-white rounded-xl border-2 border-stone-900 hover:bg-[#1b8af1] hover:border-[#1b8af1] transition-colors font-bold text-sm whitespace-nowrap text-center"
              >
                Start free
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating live-chat entry point (Crisp loads lazily on first click) */}
      <button
        type="button"
        onClick={() => openSupportChat('Question about Empath for my practice: ')}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-stone-900 text-white border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1] hover:bg-[#1b8af1] transition-colors cursor-pointer text-sm font-bold"
        aria-label="Chat with us about Empath for your practice"
      >
        <MessageSquare className="w-5 h-5" aria-hidden="true" />
        Questions? Chat with us
      </button>
    </div>
  );
}
