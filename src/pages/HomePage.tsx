import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import howitworksPng from '../../public/howitworks.png';
import howitworksWebp from '../../public/optimized/howitworks.webp';
import SEO from '../components/SEO';
import FAQItem from '../components/FAQItem';

import {
  Brain,
  Clock,
  TrendingUp,
  Heart,
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
  X
} from 'lucide-react';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Section component with animation
interface AnimatedSectionProps {
  children: React.ReactNode;
  className: string;
  delay?: number;
}

const AnimatedSection = ({ children, className, delay = 0 }: AnimatedSectionProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { delay, duration: 0.6, ease: "easeOut" }
        }
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const features = [
  {
    icon: Clock,
    title: "Pre-Session Catch-Up Summaries",
    description: "Save the 15 minutes you'd otherwise spend re-orienting. Every brief opens with what changed since the last session, not a blank page."
  },
  {
    icon: Users,
    title: "People & Relationship Insights",
    description: "See which relationships track with a client's emotional volatility over time, so you can raise it before they do."
  },
  {
    icon: HeartPulse,
    title: "Biometric & Mood Synthesis",
    description: "When a client opts into Apple Health, Empath lines up sleep, activity, and heart-rate variability against mood, so a rough week reads as data, not a mystery."
  },
  {
    icon: Building2,
    title: "White-Label Practice Extension",
    description: "Offer Empath under your own practice's name and branding, a premium touch that extends your care between sessions instead of ending at the door."
  }
];

const faqs = [
  {
    q: "Will this add to my administrative workload?",
    a: "No. It's built to shrink admin time, not add to it. Your dashboard turns a week of client activity into one short brief, so pre-session prep and note-writing take less time, not more."
  },
  {
    q: "How do clients respond to messaging Empath?",
    a: "Very well, because there's nothing new to learn. Clients text or send a voice note on WhatsApp or Telegram, apps already open on their phone, so engagement holds up in ways a dedicated homework app never did."
  },
  {
    q: "Is Empath HIPAA compliant?",
    a: "Yes. Client data is encrypted at rest and in transit, we sign a Business Associate Agreement (BAA) with every practice, and none of it is used to train AI models. Access is limited to the therapist and the client."
  },
  {
    q: "Does Empath try to replace the therapist?",
    a: "No, and it isn't built to. Empath is an administrative and reflective co-pilot: it handles memory, pattern recognition, and data synthesis between sessions, while your clinical judgment, attunement, and the therapeutic relationship stay entirely yours."
  },
  {
    q: "What do I actually see before a session?",
    a: "A short, plain-language brief: mood trends, notable events, people who came up, and a couple of signals worth raising, built from what your client shared since you last met. No raw transcripts unless you want them."
  },
  {
    q: "Can I offer this under my own practice's brand?",
    a: "Yes. Group practices and private clinicians can offer Empath as a white-labeled extension of their care, so it reads as your practice's tool, not a third-party app."
  }
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

export default function HomePage() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSampleBrief, setShowSampleBrief] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
  <div className="flex-grow overflow-x-hidden">
      <SEO
        title="Empath for Therapists | Between-Session AI Insights"
        description="Empath captures what happens between sessions so therapists can see how clients are doing in real life, not just what they remember to share. AI-powered insights, secure and HIPAA-aligned."
        path="/therapist"
        keywords="therapist software, between-session insights, AI for therapists, therapy outcomes, clinical decision support, therapy practice management"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(therapistFaqSchema) }}
      />

      {/* ============ 1. HERO SECTION ============ */}
      <AnimatedSection className="bg-gradient-to-b from-slate-50 via-gray-50 to-white py-32 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="w-96 h-96 bg-slate-200/20 rounded-full absolute -top-20 -left-20 blur-3xl"></div>
          <div className="w-96 h-96 bg-indigo-100/20 rounded-full absolute top-40 -right-20 blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="text-sm md:text-base text-slate-500 font-medium mb-6 tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                For Private Practice Therapists & Group Practices
              </motion.p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-10 leading-tight">
                <motion.div
                  className="relative mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-slate-900 font-bold tracking-tight">
                    Stop spending the first 15 minutes
                  </span>
                </motion.div>

                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-slate-600 font-light tracking-tight text-3xl sm:text-4xl md:text-5xl">
                    of every session playing catch-up.
                  </span>
                </motion.div>
              </h1>

              <motion.p
                className="text-xl sm:text-2xl md:text-3xl mb-12 leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-slate-700 font-light">Empath turns your client's life between sessions into a 3-minute brief, captured with zero friction over WhatsApp, Telegram, or a quick voice call, so your </span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                  human judgment
                </span>
                <span className="text-slate-700 font-light"> does the rest.</span>
              </motion.p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  onClick={() => setShowCalendar(true)}
                  className="px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center group cursor-pointer font-light tracking-wide"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Book a 15-minute clinical demo with our team"
                >
                  Book a 15-Minute Clinical Demo
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </motion.button>
                <motion.button
                  onClick={() => setShowSampleBrief(true)}
                  className="px-8 py-4 bg-white text-slate-900 rounded-lg border-2 border-slate-900 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center group cursor-pointer font-medium tracking-wide"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="See a sample pre-session brief"
                >
                  See a Sample Pre-Session Brief
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </motion.button>
              </div>

              {/* Trust banner */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12 text-sm text-slate-500 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                  HIPAA Compliant
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                  BAA Included
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                  Zero Data Used for AI Training
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Calendar Modal */}
      {showCalendar && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="calendar-modal-title"
        >
          <motion.div
            className="bg-white rounded-xl p-8 w-full max-w-4xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 id="calendar-modal-title" className="text-2xl font-light text-slate-900">Schedule Your Clinical Demo</h2>
              <motion.button
                onClick={() => setShowCalendar(false)}
                className="text-slate-400 hover:text-slate-600 rounded-full p-2 transition-colors cursor-pointer"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                aria-label="Close calendar"
              >
                <X size={20} aria-hidden="true" />
              </motion.button>
            </div>
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3ciL9GVqgrLt07RkxMMYq-0szLXts_yaQ6M7oa0l6Egx-c1gM_1ayZa6kBmPgtXZZgZDs69oxz?gv=true"
              style={{ border: 0 }}
              width="100%"
              height="600"
              frameBorder="0"
              className="rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Sample Pre-Session Brief Modal */}
      {showSampleBrief && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sample-brief-modal-title"
          onClick={() => setShowSampleBrief(false)}
        >
          <motion.div
            className="bg-white rounded-xl p-6 md:p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 id="sample-brief-modal-title" className="text-2xl font-light text-slate-900">Sample Pre-Session Brief</h2>
                <p className="text-sm text-slate-500 mt-1">Client: J.M. &middot; Session 12 &middot; Illustrative example, not a real client</p>
              </div>
              <motion.button
                onClick={() => setShowSampleBrief(false)}
                className="text-slate-400 hover:text-slate-600 rounded-full p-2 transition-colors cursor-pointer flex-shrink-0"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                aria-label="Close sample brief"
              >
                <X size={20} aria-hidden="true" />
              </motion.button>
            </div>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Mood trend</p>
                  <p className="text-slate-600 text-sm leading-relaxed mt-0.5">Steadier this week overall, with two rough days midweek that lined up with a poor night's sleep on Wednesday.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Sleep & activity</p>
                  <p className="text-slate-600 text-sm leading-relaxed mt-0.5">Average sleep dropped to 5.4 hrs from a 7.1 hr baseline; step count down about 40% since last session.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">People mentioned</p>
                  <p className="text-slate-600 text-sm leading-relaxed mt-0.5">Older sibling came up three times this week, with a noticeably different tone each time.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-amber-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Notable quote</p>
                  <p className="text-slate-600 text-sm leading-relaxed mt-0.5 italic">"I keep replaying the conversation with my brother and I don't know why it's bothering me this much."</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Suggested focus</p>
                  <p className="text-slate-600 text-sm leading-relaxed mt-0.5">Consider opening with the sibling dynamic before returning to sleep hygiene.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed">
                Generated from your client's WhatsApp and Telegram check-ins and voice notes between sessions. You decide what surfaces before every appointment.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ============ 2. THE VS. CHATGPT COMPARISON (JUDO FLIP) ============ */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={fadeIn}
              className="text-center mb-16"
            >
              <p className="text-sm md:text-base text-slate-500 font-medium mb-4 tracking-widest uppercase">
                The Comparison Clients Are Already Making
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6">
                Your clients compare you to ChatGPT on memory.<br className="hidden md:block" /> Flip the comparison instead.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-16 max-w-4xl mx-auto">
              {/* Column A: ChatGPT Alone */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 h-full shadow-xl border border-slate-700 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center mr-3">
                        <Brain className="w-6 h-6 text-green-400" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-white">ChatGPT Alone</h3>
                    </div>

                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-4 mt-0.5">
                          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-medium text-white">Instant Memory</p>
                          <p className="text-sm text-slate-400 mt-1">Recalls everything a client has ever typed, instantly</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-4 mt-0.5">
                          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-medium text-white">24/7 Access</p>
                          <p className="text-sm text-slate-400 mt-1">Answers a 3 a.m. spiral the moment it happens</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mr-4 mt-0.5">
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-medium text-white">Zero Clinical Judgment</p>
                          <p className="text-sm text-slate-400 mt-1">No license, no attunement, no duty of care</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Column B: YOU + Empath */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-xl p-8 h-full shadow-xl border-2 border-slate-900 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                        <Heart className="w-6 h-6 text-slate-900" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">You + Empath</h3>
                    </div>

                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-0.5">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-medium text-slate-900">AI-Level Memory & Pattern Recognition</p>
                          <p className="text-sm text-slate-600 mt-1">A 3-minute brief instead of guesswork at the start of session</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-0.5">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-medium text-slate-900">Irreplaceable Human Judgment & Connection</p>
                          <p className="text-sm text-slate-600 mt-1">Clinical training, attunement, and a real therapeutic alliance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="bg-slate-50 border-2 border-slate-200 rounded-lg p-8 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-slate-700 font-light leading-relaxed">
                  You can't win a memory contest against something that never forgets. But you were never competing on memory alone, and once Empath closes that gap, <span className="font-medium text-slate-900">the comparison stops being about who remembers more and starts being about who understands better.</span> That's the fight you already win.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ============ 3. THE 167-HOUR BLACK HOLE ============ */}
      <section className="py-24 relative bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <p className="text-sm md:text-base text-slate-500 font-medium mb-4 tracking-wider uppercase">
                The Missing Data Problem
              </p>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight">
                The 167-Hour <span className="text-slate-400 font-semibold">Black Hole</span>
              </h2>

              <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto font-light leading-relaxed">
                A weekly session gives you <span className="text-slate-900 font-semibold">1 hour</span> of direct observation, and<br />
                the other <span className="text-slate-900 font-semibold">167 hours</span> happen where you can't see them.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900">Session Recall Alone</h3>
                    <p className="text-sm text-slate-600 mt-1">Whatever a client remembers to mention, filtered by however they feel in the room that day</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl md:text-3xl font-bold text-red-600">1 hr</div>
                    <div className="text-xs text-slate-500">of the week</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-16">Week</span>
                    <div className="flex-1 h-12 bg-slate-100 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center px-3">
                        <div className="w-[0.6%] h-8 bg-slate-900 rounded"></div>
                        <span className="ml-3 text-xs text-slate-400">1 hour of direct observation</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                    <p className="text-sm text-red-800">
                      <span className="font-semibold">Recall bias does the rest.</span> Clients report on a rough week through the lens of however they feel that hour, so triggers, avoidant patterns, and small breakthroughs get smoothed over or forgotten entirely.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 md:p-8 shadow-xl border border-slate-700 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">With Empath</h3>
                    <p className="text-sm text-slate-300 mt-1">Captured in the moment, no extra effort from your client</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl md:text-3xl font-bold text-green-400">168 hrs</div>
                    <div className="text-xs text-slate-300">in view</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-16">Week</span>
                    <div className="flex-1 h-12 bg-slate-700/50 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-80"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs text-white font-medium">Sleep, mood, relationships, and triggers, as they happen</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                    <p className="text-sm text-green-100">
                      <span className="font-semibold text-green-300">No homework required.</span> Clients text or voice-note through a channel they already have open, so the data shows up without them having to try harder.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 md:p-8 border border-slate-200 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  From a single snapshot to the full week
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  Empath closes most of that 167-hour gap, so your clinical judgment works with <span className="font-semibold text-slate-900">real context, not a client's best guess at recall.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. THE CLINICAL WORKFLOW ============ */}
      <AnimatedSection className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
              How It Works, in Three Steps
            </h2>
            <p className="text-center text-slate-600 mt-4 text-xl max-w-3xl mx-auto leading-relaxed font-light">
              No new workflow for you. No new app for your client to remember to open.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={slideInLeft} className="relative">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }}>
                <picture>
                  <source srcSet={howitworksWebp} type="image/webp" />
                  <img
                    src={howitworksPng}
                    alt="Client activity flowing into an Empath pre-session brief"
                    className="rounded-lg shadow-md relative z-10"
                    width="1200"
                    height="675"
                    loading="lazy"
                  />
                </picture>
              </motion.div>
            </motion.div>
            <motion.div variants={fadeIn} className="relative">
              <div className="relative">
                <div className="absolute left-[20px] md:left-[20px] top-[10px] h-[calc(100%-20px)] w-[1px] bg-gradient-to-b from-green-400 via-blue-400 to-indigo-400 hidden md:block"></div>

                <div className="space-y-16">
                  <motion.div variants={slideInRight} className="flex items-start">
                    <div className="flex-shrink-0 relative w-10 h-10 bg-green-50 rounded-full flex items-center justify-center border border-green-200 z-10">
                      <span className="text-green-600 font-light">1</span>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 ml-4 w-full group hover:-translate-y-1 border border-slate-100">
                      <h3 className="text-xl font-light mb-3 text-slate-900">Zero-Friction Client Capture</h3>
                      <p className="text-slate-600 leading-relaxed font-light">
                        Clients log life as it happens over WhatsApp, Telegram, or a quick voice call, no new app to download, nothing extra to remember. That's why homework compliance actually holds.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={slideInRight} className="flex items-start">
                    <div className="flex-shrink-0 relative w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center border border-blue-200 z-10">
                      <span className="text-blue-600 font-light">2</span>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 ml-4 w-full group hover:-translate-y-1 border border-slate-100">
                      <h3 className="text-xl font-light mb-3 text-slate-900">Continuous Pattern Synthesis</h3>
                      <p className="text-slate-600 leading-relaxed font-light">
                        Empath synthesizes mood, voice tonality, and, when a client opts in, Apple Health data into a short list of clinically relevant signals, not a raw data dump.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={slideInRight} className="flex items-start">
                    <div className="flex-shrink-0 relative w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center border border-indigo-200 z-10">
                      <span className="text-indigo-600 font-light">3</span>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 ml-4 w-full group hover:-translate-y-1 border border-slate-100">
                      <h3 className="text-xl font-light mb-3 text-slate-900">Your 3-Minute Pre-Session Brief</h3>
                      <p className="text-slate-600 leading-relaxed font-light">
                        Review a concise brief before your client sits down. Walk in already knowing what shifted this week, not guessing.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ============ 5. CLINICAL FEATURES ============ */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-center mb-4 text-slate-900">
              Clinical Superpowers, Not Gimmicks
            </h2>
            <p className="text-center text-slate-600 mt-8 text-xl max-w-3xl mx-auto leading-relaxed font-light">
              Built with practicing therapists, each feature earns its place by giving back time or context, never both at the client's expense.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-8 rounded-lg bg-slate-50 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 group relative overflow-hidden"
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <div className="mb-6 p-4 bg-white rounded-lg inline-block group-hover:bg-slate-100 transition-colors duration-300 relative z-10 shadow-sm">
                  <feature.icon className="w-8 h-8 text-slate-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light mb-3 text-slate-900 relative z-10">{feature.title}</h3>
                <p className="text-slate-600 font-light relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ============ 6. CLINICAL TESTIMONIALS & ADVISORY BOARD ============ */}
      <AnimatedSection className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl md:text-4xl font-light text-center mb-16 text-slate-900"
          >
            What Therapists Are Saying
          </motion.h2>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              variants={scaleIn}
              className="relative"
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="relative bg-white p-8 md:p-10 rounded-lg shadow-sm border border-slate-200 z-10 h-full flex flex-col">
                <div className="text-2xl text-slate-300 mb-4">"</div>
                <blockquote className="text-lg md:text-xl text-slate-700 font-light leading-relaxed flex-grow">
                  "Great therapy starts with understanding. But currently, therapists only get a glimpse into their clients' lives during hour-long sessions. <br />Empath is bridging this gap by helping clients document their experiences through journaling, health data, and mood tracking between sessions. This gives therapists a more complete picture of their clients' journeys before they meet."
                </blockquote>
                <div className="text-2xl text-slate-300 mt-2 text-right">"</div>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="font-medium text-slate-900">Arjun Nanda</p>
                  <p className="text-slate-500 font-light">Psychiatrist &nbsp;|&nbsp; Host of The Mental Health Forecast</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="relative"
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="relative bg-white p-8 md:p-10 rounded-lg shadow-sm border border-slate-200 z-10 h-full flex flex-col">
                <div className="text-2xl text-slate-300 mb-4">"</div>
                <blockquote className="text-lg md:text-xl text-slate-700 font-light leading-relaxed flex-grow">
                  "Most sessions are spent catching up. Intake forms and assessments only go so far, ongoing life experiences, highs and lows, and even subtle details matter. Empath helps capture this and enhance sessions."
                </blockquote>
                <div className="text-2xl text-slate-300 mt-2 text-right">"</div>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="font-medium text-slate-900">Mabel Yiu, LMFT</p>
                  <p className="text-slate-500 font-light">Marriage and Family Therapist &nbsp;|&nbsp; Advisory Board Member</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeIn} className="text-center">
            <Link
              to="/advisory"
              className="inline-flex items-center text-slate-900 font-medium hover:text-blue-700 transition-colors group"
            >
              Interested in shaping the product as a clinical advisor? Learn about our Advisory Program
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ============ 7. FREQUENTLY ASKED QUESTIONS ============ */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl md:text-4xl font-light text-center mb-16 text-slate-900"
          >
            Questions Therapists Ask Us
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 px-6 md:px-8"
          >
            {faqs.map((item) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ============ 8. FINAL CALL TO ACTION ============ */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            variants={fadeIn}
            className="text-3xl md:text-5xl font-light mb-6 text-white"
          >
            Level the playing field on data.<br className="hidden md:block" /> Let your human empathy do the rest.
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-xl mb-12 text-slate-300 max-w-2xl mx-auto leading-relaxed font-light"
          >
            See how a 3-minute brief changes the way you walk into session, or try the client experience yourself first.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button
              onClick={() => setShowCalendar(true)}
              className="px-10 py-5 bg-white text-slate-900 rounded-lg shadow-2xl hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center group cursor-pointer font-semibold text-lg"
              variants={fadeIn}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule a 15-Min Demo
              <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.a
              href="https://app.empathdash.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-transparent text-white rounded-lg border-2 border-white/40 hover:border-white transition-all duration-300 inline-flex items-center justify-center group cursor-pointer font-medium text-lg"
              variants={fadeIn}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Get started with Empath for free"
            >
              Get Started Free
            </motion.a>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}
