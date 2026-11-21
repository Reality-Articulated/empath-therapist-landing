import posthog from 'posthog-js';
import { ChevronRight, PieChart, Compass, HeartHandshake, Users } from 'lucide-react';
import SEO from '../components/SEO';
import FAQItem from '../components/FAQItem';
import TherapistHeader from '../components/therapist/TherapistHeader';
import TherapistFooter from '../components/therapist/TherapistFooter';
import AdvisoryApplicationForm from '../components/therapist/AdvisoryApplicationForm';
import { THERAPIST_BOOKING_URL } from '../utils/therapistBooking';

// Same class strings as the therapist landing page (HomePage.tsx): cream and
// white bands, hairline stone borders, soft shadows, serif headlines at
// medium weight, pill buttons, #1b8af1 as the single accent.
const PRIMARY_BTN =
  'px-7 py-3.5 bg-stone-900 text-white rounded-full hover:bg-[#1b8af1] transition-colors duration-200 font-semibold inline-flex items-center justify-center gap-2 text-base cursor-pointer';
const SECONDARY_BTN =
  'px-7 py-3.5 bg-white text-stone-900 rounded-full border border-stone-300 hover:border-stone-900 transition-colors duration-200 font-semibold inline-flex items-center justify-center gap-2 text-base cursor-pointer';
const H2 = 'font-serif text-3xl md:text-[2.75rem] font-medium tracking-tight leading-[1.12] text-stone-900 mb-6';
const SECTION_SUB = 'text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto';
const EYEBROW = 'text-xs font-semibold uppercase tracking-[0.18em] text-[#1b8af1] mb-5';
const CARD = 'p-8 rounded-3xl border border-stone-200 shadow-soft';
const STEP_LABEL = 'inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[#1b8af1] mb-4';

const benefits = [
  {
    icon: PieChart,
    title: 'Earn ownership',
    description: 'Equity from 0.5% to 5%, based on your contributions and feedback.',
  },
  {
    icon: Compass,
    title: 'Shape the product',
    description: 'A direct say in what we build for therapists, and in what we leave out.',
  },
  {
    icon: HeartHandshake,
    title: 'Strengthen your practice',
    description: 'Tools designed to complement your work, never to replace your judgment.',
  },
  {
    icon: Users,
    title: 'Join a community',
    description: 'Work alongside other therapists who care about getting this right.',
  },
];

const steps = [
  {
    title: 'Apply',
    description:
      'Tell us about your practice and start using Empath with your clients. You get early access and a guided onboarding.',
  },
  {
    title: 'Give feedback',
    description:
      'Share what works and what does not. Your clinical feedback goes straight into the product roadmap.',
  },
  {
    title: 'Join the advisory board',
    description:
      'Based on your contributions, you receive an equity stake and keep shaping where Empath goes next.',
  },
];

const faqs = [
  {
    q: 'What is the advisory program?',
    a: 'Therapists are the experts in mental health care, so we invite them to shape Empath directly. As an advisor you help build tools that support the therapeutic relationship, never replace it, and you earn equity for your expertise.',
  },
  {
    q: 'How is Empath different from other therapy apps?',
    a: "Most platforms focus on scheduling or in-session tools. We focus on the time between sessions. If a client's life is a TV show, therapy lets you watch one episode every two weeks, and Empath helps you keep up with the full story. We build it with therapists, not for them. That is why advisors earn equity: if therapists help build it, they should own part of it.",
  },
  {
    q: 'How is the equity allocated?',
    a: 'Equity ranges from 0.5% to 5% and vests on milestones. Advisors earn portions as they complete feedback cycles or reach specific milestones over one to two years.',
  },
  {
    q: 'What are the requirements for joining?',
    a: 'Use Empath with at least one client for at least a month, give structured feedback, and uphold ethical standards in data use and client relationships.',
  },
  {
    q: 'How much time will I need to commit?',
    a: 'Plan for at least 2 hours a month. Most feedback sessions take about 30 minutes, and quarterly reviews are required to meet vesting milestones.',
  },
];

export default function AdvisoryPage() {
  const trackBookCall = (location: string) =>
    posthog.capture('therapist_cta_clicked', { cta: 'advisory_book_call', location });

  return (
    <div className="flex-grow bg-[#FAF9F6]">
      <SEO
        title="Clinical Advisory Board | Empath for Therapists"
        description="Join Empath's clinical advisory board. Help shape the future of between-session data capture and AI-driven clinical insights alongside leading therapists and researchers."
        path="/advisory"
      />

      <TherapistHeader />

      {/* ============ 1. HERO ============ */}
      <section className="bg-white pt-20 md:pt-28 pb-20 md:pb-24 border-b border-stone-200">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <p className={EYEBROW}>Clinical advisory program</p>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-stone-900 mb-7 leading-[1.08]">
            Help build Empath,{' '}
            <span className="italic text-[#1b8af1] sm:block">and own part of it.</span>
          </h1>

          <p className="text-lg md:text-xl text-stone-600 mb-9 max-w-3xl mx-auto leading-relaxed">
            You are the expert on what happens in the room. Advise us on the tools that support it, and earn equity in
            what you help create.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
            <a href="#apply" className={`${PRIMARY_BTN} flex-1`}>
              Apply to advise
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href={THERAPIST_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackBookCall('hero')}
              className={`${SECONDARY_BTN} flex-1`}
            >
              Book a call
            </a>
          </div>
          <p className="text-sm text-stone-500 mt-4">About 2 hours a month. Equity from 0.5% to 5%.</p>
        </div>
      </section>

      {/* ============ 2. WHY JOIN ============ */}
      <section className="py-24 bg-[#FAF9F6] border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className={EYEBROW}>Why join</p>
            <h2 className={H2}>What advisors get</h2>
            <p className={SECTION_SUB}>
              A real stake in the product, and a real say in how it treats therapists and their clients.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.title} className={`${CARD} bg-white`}>
                <span className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center mb-5">
                  <benefit.icon className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{benefit.title}</h3>
                <p className="text-stone-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. HOW IT WORKS ============ */}
      <section className="py-24 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className={EYEBROW}>How it works</p>
            <h2 className={H2}>From advisor to owner</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.title} className={`${CARD} bg-[#FAF9F6]`}>
                <span className={STEP_LABEL}>Step {i + 1}</span>
                <h3 className="font-serif text-2xl font-medium text-stone-900 mb-3">{step.title}</h3>
                <p className="text-stone-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. FAQ ============ */}
      <section className="py-24 bg-[#FAF9F6] border-b border-stone-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-medium text-center text-stone-900 mb-12 font-serif tracking-tight">
            Questions advisors ask
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((item) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. APPLY ============ */}
      <section id="apply" className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className={EYEBROW}>Apply</p>
            <h2 className={H2}>Apply to advise</h2>
            <p className={SECTION_SUB}>
              Tell us a little about your practice. Div, Empath's founder, reads every application and replies by
              email.
            </p>
          </div>

          <div className={`${CARD} bg-[#FAF9F6] max-w-3xl mx-auto`}>
            <AdvisoryApplicationForm />
          </div>

          <p className="text-center text-stone-600 mt-8">
            Prefer to talk first?{' '}
            <a
              href={THERAPIST_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackBookCall('apply')}
              className="font-semibold text-stone-900 hover:text-[#1b8af1] transition-colors inline-flex items-center gap-1"
            >
              Book a call
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </p>
        </div>
      </section>

      <TherapistFooter />
    </div>
  );
}
