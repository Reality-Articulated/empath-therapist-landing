import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneCall, MessageSquare, BookOpenCheck, ShieldCheck, ChevronLeft, Loader2, CalendarClock } from 'lucide-react';
import { Link } from 'react-router-dom';
import posthog from 'posthog-js';
import SEO from '../components/SEO';
import logo from '../../public/empath-logo.png';
import { useCallMeRequest, formatAsYouType, formatScheduledFor, PHONE_MAIN, PHONE_DISPLAY } from '../components/CallMeForm';
import { useCallMeCopy } from '../i18n/copy';

const APP_STORE_URL = 'https://apps.apple.com/us/app/empath-ai-diary-for-your-mind/id6472873287';

const STEP_ICONS = [PhoneCall, MessageSquare, BookOpenCheck];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/** Date → the local-time string a datetime-local input expects. */
function toLocalInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Inline phone link used mid-sentence between a copy pre/post pair. */
const PhoneLink = () => (
  <a href={`tel:${PHONE_MAIN}`} className="text-[#1b8af1] font-semibold">{PHONE_DISPLAY}</a>
);

export default function CallMePage() {
  const c = useCallMeCopy();
  const { digits, state, errorMessage, scheduledFor, handleInput, requestCall } = useCallMeRequest(
    { requested: 'call_me_call_requested', placed: 'call_me_call_placed', failed: 'call_me_call_failed' },
    'call_me_page',
    { generic: c.form.errorGeneric, network: c.form.errorNetwork },
  );
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleValue, setScheduleValue] = useState('');

  useEffect(() => {
    posthog.capture('call_me_page_viewed');
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      <SEO
        title={c.seo.title}
        description={c.seo.description}
        path="/call-me"
        keywords={c.seo.keywords}
        translated
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
              <Phone className="w-4 h-4" /> {c.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
              {c.hero.h1}
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-medium mb-10 max-w-2xl mx-auto">
              {c.hero.sub}
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-md mx-auto">
            {state === 'ringing' ? (
              <div className="bg-white border-2 border-[#1b8af1] rounded-2xl p-8 shadow-lg">
                <div className="text-5xl mb-4" aria-hidden>📞</div>
                <h2 className="text-2xl font-bold mb-2">{c.ringing.title}</h2>
                <p className="text-stone-600 font-medium">
                  {c.ringing.body}
                </p>
                <p className="text-sm text-stone-400 mt-4">
                  {c.ringing.missedPre} <PhoneLink /> {c.ringing.missedPost}
                </p>
              </div>
            ) : state === 'scheduled' && scheduledFor ? (
              <div className="bg-white border-2 border-[#1b8af1] rounded-2xl p-8 shadow-lg">
                <div className="text-5xl mb-4" aria-hidden>🗓️</div>
                <h2 className="text-2xl font-bold mb-2">{c.scheduled.title}</h2>
                <p className="text-stone-600 font-medium">
                  {c.scheduled.bodyPre} <span className="font-bold text-stone-900">{formatScheduledFor(scheduledFor)}</span>{' '}
                  {c.scheduled.bodyPost}
                </p>
                <p className="text-sm text-stone-400 mt-4">
                  {c.scheduled.cantWaitPre} <PhoneLink /> {c.scheduled.cantWaitPost}
                </p>
              </div>
            ) : (
              <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 shadow-lg">
                <label htmlFor="phone" className="block text-left text-sm font-bold text-stone-700 mb-2">
                  {c.form.phoneLabel}
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
                    ? (<><Loader2 className="w-5 h-5 animate-spin" /> {c.form.dialing}</>)
                    : (<><PhoneCall className="w-5 h-5" /> {c.form.callMeNow}</>)}
                </button>

                {/* Schedule for later — sent as absolute UTC; the picker is inherently local time */}
                {showSchedule ? (
                  <div className="mt-4 pt-4 border-t-2 border-stone-100 text-left">
                    <label htmlFor="schedule-time" className="block text-sm font-bold text-stone-700 mb-2">
                      {c.form.scheduleTimeLabel} <span className="font-medium text-stone-400">{c.form.localTimeNote}</span>
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
                        ? (<><Loader2 className="w-5 h-5 animate-spin" /> {c.form.scheduling}</>)
                        : (<><CalendarClock className="w-5 h-5" /> {c.form.scheduleMyCall}</>)}
                    </button>
                    <p className="text-xs text-stone-400 mt-2">
                      {c.form.scheduleWindow}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSchedule(true)}
                    className="w-full mt-3 text-sm font-semibold text-stone-500 hover:text-[#1b8af1] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CalendarClock className="w-4 h-4" /> {c.form.orSchedule}
                  </button>
                )}

                {state === 'error' && (
                  <p className="text-sm text-red-600 font-medium mt-3" role="alert">{errorMessage}</p>
                )}
                <p className="text-xs text-stone-400 mt-4 leading-relaxed">
                  {c.form.consent}
                </p>
              </div>
            )}
            <p className="text-sm text-stone-500 font-medium mt-5">
              {c.dialYourself.pre} <PhoneLink /> {c.dialYourself.post}
            </p>
          </motion.div>
        </section>

        {/* How it works */}
        <section className="bg-white border-y-2 border-stone-100 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-center mb-12">{c.how.title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {c.how.steps.map((step, i) => {
                const StepIcon = STEP_ICONS[i];
                return (
                  <motion.div
                    key={step.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1b8af1] flex items-center justify-center mx-auto mb-4">
                      <StepIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{i + 1}. {step.title}</h3>
                    <p className="text-stone-600 font-medium leading-relaxed">{step.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why phone journaling */}
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-extrabold mb-5">{c.why.title}</h2>
          <p className="text-lg text-stone-600 font-medium leading-relaxed mb-8">
            {c.why.body}
          </p>
          <div className="inline-flex items-center gap-2 text-stone-500 font-medium text-sm">
            <ShieldCheck className="w-5 h-5 text-[#1b8af1]" />
            {c.why.encrypted}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white border-t-2 border-stone-100 py-16">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-center mb-10">{c.faq.title}</h2>
            <div className="space-y-8">
              {c.faq.items.map((faq) => (
                <div key={faq.q}>
                  <h3 className="text-lg font-bold mb-1.5">{faq.q}</h3>
                  <p className="text-stone-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <p className="text-stone-600 font-medium mb-3">{c.faq.readBackPrompt}</p>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => posthog.capture('call_me_app_store_clicked')}
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-700 text-white font-bold rounded-xl px-6 py-3 transition-colors"
              >
                {c.faq.appStoreCta}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-5xl w-full mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-stone-400 font-medium">
        <span>© {new Date().getFullYear()} Empath</span>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-stone-600 transition-colors">{c.footer.privacy}</Link>
          <Link to="/terms" className="hover:text-stone-600 transition-colors">{c.footer.terms}</Link>
        </div>
      </footer>
    </div>
  );
}
