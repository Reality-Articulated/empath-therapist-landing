import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneCall, MessageSquare, BookOpenCheck, ShieldCheck, ChevronLeft, Loader2, CalendarClock } from 'lucide-react';
import { Link } from 'react-router-dom';
import posthog from 'posthog-js';
import SEO from '../components/SEO';
import logo from '../../public/empath-logo.png';
import { useCallMeRequest, formatAsYouType, formatScheduledFor, PHONE_MAIN, PHONE_DISPLAY } from '../components/CallMeForm';

const APP_STORE_URL = 'https://apps.apple.com/us/app/empath-ai-diary-for-your-mind/id6472873287';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/** Date → the local-time string a datetime-local input expects. */
function toLocalInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function CallMePage() {
  const { digits, state, errorMessage, scheduledFor, handleInput, requestCall } = useCallMeRequest(
    { requested: 'call_me_call_requested', placed: 'call_me_call_placed', failed: 'call_me_call_failed' },
    'call_me_page',
  );
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleValue, setScheduleValue] = useState('');

  useEffect(() => {
    posthog.capture('call_me_page_viewed');
  }, []);

  const steps = [
    {
      icon: PhoneCall,
      title: 'Pick up',
      text: 'Your phone rings within seconds. Empath introduces itself and asks how you’re feeling.',
    },
    {
      icon: MessageSquare,
      title: 'Just talk',
      text: 'Ramble, vent, reflect — Empath listens and gently asks follow-up questions. No prompts to memorize.',
    },
    {
      icon: BookOpenCheck,
      title: 'Hang up, it’s saved',
      text: 'Your words become a private journal entry, and you get a text confirming it’s saved.',
    },
  ];

  const faqs = [
    {
      q: 'Do I need the app?',
      a: 'No. The call is the whole experience — no download, no account, no password. If you later want to read your entries back and see mood insights, the free iOS app picks up right where your calls left off.',
    },
    {
      q: 'Is it really a person calling?',
      a: 'It’s Empath’s AI journaling companion — the same one behind our call-anytime number. It listens, asks thoughtful questions, and turns the conversation into a written entry.',
    },
    {
      q: 'Is my journal private?',
      a: 'Yes. Entries are encrypted at rest and belong to you. We never sell your data.',
    },
    {
      q: 'What does it cost?',
      a: 'Your first entries are free — no card, no trial to cancel. Calling is part of Empath, and standard carrier rates for a regular phone call apply.',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      <SEO
        title="Empath Calls You — Journal by Phone, No App Needed"
        description="Enter your number and Empath calls you for your first voice journal entry. Talk it out, hang up, and it's saved. No app, no account, no typing."
        path="/call-me"
        keywords="journal by phone, voice journaling, phone journaling, journaling without an app, audio diary"
      />

      {/* Minimal chrome (page is in the hideNavbar list) */}
      <header className="max-w-5xl w-full mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Empath" className="w-8 h-8" />
          <span className="font-bold text-lg">Empath</span>
        </Link>
        <Link to="/" className="text-sm font-medium text-stone-500 hover:text-[#1b8af1] transition-colors flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> empathdash.com
        </Link>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-12 pb-16 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <span className="inline-flex items-center gap-2 bg-blue-50 text-[#1b8af1] font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
              <Phone className="w-4 h-4" /> No app. No account. No typing.
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
              Your first journal entry is a phone call away.
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-medium mb-10 max-w-2xl mx-auto">
              Enter your number and Empath calls you. Talk about your day for a couple of
              minutes, hang up, and it’s saved as a private journal entry — transcribed, titled,
              and waiting whenever you want it.
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-md mx-auto">
            {state === 'ringing' ? (
              <div className="bg-white border-2 border-[#1b8af1] rounded-2xl p-8 shadow-lg">
                <div className="text-5xl mb-4" aria-hidden>📞</div>
                <h2 className="text-2xl font-bold mb-2">Calling you now — pick up!</h2>
                <p className="text-stone-600 font-medium">
                  Say hi, talk about your day, and hang up whenever you’re done. Your entry saves
                  automatically and we’ll text you a confirmation.
                </p>
                <p className="text-sm text-stone-400 mt-4">
                  Missed it? Dial{' '}
                  <a href={`tel:${PHONE_MAIN}`} className="text-[#1b8af1] font-semibold">{PHONE_DISPLAY}</a>{' '}
                  any time — journaling by phone works around the clock.
                </p>
              </div>
            ) : state === 'scheduled' && scheduledFor ? (
              <div className="bg-white border-2 border-[#1b8af1] rounded-2xl p-8 shadow-lg">
                <div className="text-5xl mb-4" aria-hidden>🗓️</div>
                <h2 className="text-2xl font-bold mb-2">You’re on the calendar!</h2>
                <p className="text-stone-600 font-medium">
                  Empath will call you on <span className="font-bold text-stone-900">{formatScheduledFor(scheduledFor)}</span>{' '}
                  (your local time). Pick up, talk about your day, and hang up when you’re done.
                </p>
                <p className="text-sm text-stone-400 mt-4">
                  Can’t wait? Dial{' '}
                  <a href={`tel:${PHONE_MAIN}`} className="text-[#1b8af1] font-semibold">{PHONE_DISPLAY}</a>{' '}
                  any time — journaling by phone works around the clock.
                </p>
              </div>
            ) : (
              <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 shadow-lg">
                <label htmlFor="phone" className="block text-left text-sm font-bold text-stone-700 mb-2">
                  Your phone number (US)
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel-national"
                  inputMode="tel"
                  placeholder="(555) 123-4567"
                  value={formatAsYouType(digits)}
                  onChange={(e) => handleInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') requestCall(); }}
                  className="w-full text-lg font-semibold border-2 border-stone-200 rounded-xl px-4 py-3 mb-4 focus:border-[#1b8af1] focus:outline-none"
                />
                <button
                  onClick={() => requestCall()}
                  disabled={digits.length !== 10 || state === 'requesting'}
                  className="w-full bg-[#1b8af1] hover:bg-blue-600 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-lg font-bold rounded-xl px-6 py-3.5 transition-colors flex items-center justify-center gap-2"
                >
                  {state === 'requesting'
                    ? (<><Loader2 className="w-5 h-5 animate-spin" /> Dialing…</>)
                    : (<><PhoneCall className="w-5 h-5" /> Call me now</>)}
                </button>

                {/* Schedule for later — sent as absolute UTC; the picker is inherently local time */}
                {showSchedule ? (
                  <div className="mt-4 pt-4 border-t-2 border-stone-100 text-left">
                    <label htmlFor="schedule-time" className="block text-sm font-bold text-stone-700 mb-2">
                      Pick a time <span className="font-medium text-stone-400">(your local time)</span>
                    </label>
                    <input
                      id="schedule-time"
                      type="datetime-local"
                      value={scheduleValue}
                      min={toLocalInputValue(new Date(Date.now() + 15 * 60 * 1000))}
                      max={toLocalInputValue(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))}
                      onChange={(e) => setScheduleValue(e.target.value)}
                      className="w-full text-base font-semibold border-2 border-stone-200 rounded-xl px-4 py-3 mb-3 focus:border-[#1b8af1] focus:outline-none"
                    />
                    <button
                      onClick={() => { if (scheduleValue) requestCall(new Date(scheduleValue)); }}
                      disabled={digits.length !== 10 || !scheduleValue || state === 'requesting'}
                      className="w-full bg-stone-900 hover:bg-stone-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-base font-bold rounded-xl px-6 py-3 transition-colors flex items-center justify-center gap-2"
                    >
                      {state === 'requesting'
                        ? (<><Loader2 className="w-5 h-5 animate-spin" /> Scheduling…</>)
                        : (<><CalendarClock className="w-5 h-5" /> Schedule my call</>)}
                    </button>
                    <p className="text-xs text-stone-400 mt-2">
                      At least 10 minutes from now, up to 7 days out.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSchedule(true)}
                    className="w-full mt-3 text-sm font-semibold text-stone-500 hover:text-[#1b8af1] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CalendarClock className="w-4 h-4" /> Or schedule the call for later
                  </button>
                )}

                {state === 'error' && (
                  <p className="text-sm text-red-600 font-medium mt-3" role="alert">{errorMessage}</p>
                )}
                <p className="text-xs text-stone-400 mt-4 leading-relaxed">
                  By requesting a call you agree to receive a single automated call from Empath
                  at this number. US numbers only. Standard carrier rates apply.
                </p>
              </div>
            )}
            <p className="text-sm text-stone-500 font-medium mt-5">
              Prefer to dial yourself? Call or text{' '}
              <a href={`tel:${PHONE_MAIN}`} className="text-[#1b8af1] font-semibold">{PHONE_DISPLAY}</a>{' '}
              — same journal, any time.
            </p>
          </motion.div>
        </section>

        {/* How it works */}
        <section className="bg-white border-y-2 border-stone-100 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-center mb-12">How it works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1b8af1] flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{i + 1}. {step.title}</h3>
                  <p className="text-stone-600 font-medium leading-relaxed">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why phone journaling */}
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-extrabold mb-5">Journaling for people who never journal</h2>
          <p className="text-lg text-stone-600 font-medium leading-relaxed mb-8">
            The hardest part of journaling is the blank page. A phone call has no blank page —
            you already know how to talk about your day. Empath asks, you answer, and three
            minutes on your commute becomes an entry you’d never have typed.
          </p>
          <div className="inline-flex items-center gap-2 text-stone-500 font-medium text-sm">
            <ShieldCheck className="w-5 h-5 text-[#1b8af1]" />
            Entries are encrypted at rest. Your journal belongs to you.
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white border-t-2 border-stone-100 py-16">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-center mb-10">Questions</h2>
            <div className="space-y-8">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="text-lg font-bold mb-1.5">{faq.q}</h3>
                  <p className="text-stone-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <p className="text-stone-600 font-medium mb-3">Want to read your entries back?</p>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => posthog.capture('call_me_app_store_clicked')}
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-700 text-white font-bold rounded-xl px-6 py-3 transition-colors"
              >
                Get Empath on the App Store
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-5xl w-full mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-stone-400 font-medium">
        <span>© {new Date().getFullYear()} Empath</span>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-stone-600 transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-stone-600 transition-colors">Terms</Link>
        </div>
      </footer>
    </div>
  );
}
