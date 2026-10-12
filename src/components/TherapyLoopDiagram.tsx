import {
  ArrowRight,
  ArrowDown,
  Sparkles,
  MessageCircle,
  Mic,
  TrendingUp,
  Users,
  Moon,
  Lightbulb,
  Repeat,
  Check,
} from 'lucide-react';

/**
 * Static "how it all fits together" diagram for the therapist landing page:
 * client phone → Empath synthesis → therapist dashboard, with the loop that
 * closes back on the client. Pure markup + Tailwind, no interactivity, so it
 * costs nothing on Core Web Vitals and reads the same with motion disabled.
 */

const Arrow = ({ label }: { label: string }) => (
  <div className="flex md:flex-col items-center justify-center gap-2 md:gap-1 text-slate-400 py-2 md:py-0 md:px-2 md:self-center" aria-hidden="true">
    <ArrowDown className="w-6 h-6 md:hidden" />
    <ArrowRight className="w-6 h-6 hidden md:block" />
    <span className="text-xs font-medium tracking-wide uppercase text-slate-500 text-center">{label}</span>
  </div>
);

const PhoneOutline = () => (
  <div className="relative mx-auto w-[200px] h-[400px] rounded-[2.25rem] border-[3px] border-slate-800 bg-white shadow-xl overflow-hidden">
    {/* notch */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-800 rounded-b-2xl" />
    <div className="absolute inset-x-0 top-7 bottom-0 px-3 pt-3 pb-4 flex flex-col gap-2.5 text-[11px] leading-snug">
      <div className="text-center text-[10px] text-slate-400 font-medium mb-1">Tue 10:42 PM</div>
      <div className="self-end max-w-[85%] rounded-2xl rounded-br-sm bg-green-500 text-white px-3 py-2">
        Barely slept again. Mom called and it turned into the same fight.
      </div>
      <div className="self-start max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-100 text-slate-800 px-3 py-2">
        That sounds exhausting. What part of the call is still sitting with you?
      </div>
      <div className="self-end max-w-[85%] rounded-2xl rounded-br-sm bg-green-500 text-white px-3 py-2 flex items-center gap-2">
        <Mic className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        <span className="flex-1 flex items-center gap-[2px]" aria-label="Voice note, 0:48">
          {[3, 6, 9, 5, 8, 4, 7, 3, 6, 8, 4].map((h, i) => (
            <span key={i} className="w-[2px] bg-white/90 rounded-full" style={{ height: `${h * 2}px` }} />
          ))}
        </span>
        <span className="text-[10px]">0:48</span>
      </div>
      <div className="self-start max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-100 text-slate-800 px-3 py-2">
        Noted. I'll keep this for your session Thursday if you want to bring it up.
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-slate-400">
        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Message</span>
      </div>
    </div>
  </div>
);

const Sparkline = () => (
  <svg viewBox="0 0 120 32" className="w-full h-8" aria-hidden="true">
    <polyline
      points="0,20 15,18 30,24 45,26 60,14 75,12 90,16 105,9 120,10"
      fill="none"
      stroke="#4f46e5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="45" cy="26" r="2.5" fill="#f43f5e" />
    <circle cx="120" cy="10" r="2.5" fill="#4f46e5" />
  </svg>
);

const DashboardOutline = () => (
  <div className="relative mx-auto w-full max-w-[340px] rounded-xl border-[3px] border-slate-800 bg-white shadow-xl overflow-hidden">
    {/* browser chrome */}
    <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-800">
      <span className="w-2 h-2 rounded-full bg-red-400" />
      <span className="w-2 h-2 rounded-full bg-amber-400" />
      <span className="w-2 h-2 rounded-full bg-green-400" />
      <span className="ml-3 text-[10px] text-slate-300 truncate">app.empathdash.com · Pre-session brief</span>
    </div>
    <div className="p-4 text-[11px] leading-snug text-slate-700">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-slate-900 text-xs">J.M. · Session 12</p>
          <p className="text-slate-400 text-[10px]">Thursday 2:00 PM · 3-minute read</p>
        </div>
        <span className="rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5 text-[10px] font-medium">Brief ready</span>
      </div>
      <div className="rounded-lg border border-slate-100 p-2.5 mb-2.5">
        <div className="flex items-center gap-1.5 text-slate-500 mb-1">
          <TrendingUp className="w-3 h-3" aria-hidden="true" />
          <span className="font-medium">Mood, last 14 days</span>
        </div>
        <Sparkline />
        <p className="text-[10px] text-slate-500 mt-1">Dip Wed–Thu, recovering since. Lines up with two short nights.</p>
      </div>
      <ul className="space-y-1.5">
        <li className="flex items-start gap-1.5">
          <Moon className="w-3 h-3 mt-0.5 text-indigo-500 flex-shrink-0" aria-hidden="true" />
          <span>Sleep under 5h on 3 of 7 nights (Apple Health, opted in)</span>
        </li>
        <li className="flex items-start gap-1.5">
          <Users className="w-3 h-3 mt-0.5 text-indigo-500 flex-shrink-0" aria-hidden="true" />
          <span>Mom came up 4× this week, each time with frustration</span>
        </li>
        <li className="flex items-start gap-1.5">
          <Lightbulb className="w-3 h-3 mt-0.5 text-amber-500 flex-shrink-0" aria-hidden="true" />
          <span>Worth raising: wants to talk about the Tuesday call</span>
        </li>
      </ul>
    </div>
  </div>
);

const signals = ['Mood trend', 'Sleep × mood', 'People mentioned', 'Signals worth raising'];

export default function TherapyLoopDiagram() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">How It All Fits Together</h2>
        <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed font-light">
          Empath sits between sessions, not inside them. Your client shares life as it happens, Empath turns it
          into a short brief, and you walk into the room already caught up. The session itself stays entirely yours.
        </p>
      </div>

      <figure
        role="img"
        aria-label="Flow diagram: a client texts and sends voice notes to Empath from their phone between sessions; Empath synthesizes the entries into mood trends, sleep and mood correlations, people mentioned, and signals worth raising; the therapist reads a three-minute pre-session brief on the Empath dashboard; a better session encourages the client to keep sharing, which closes the loop."
        className="m-0"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 md:gap-2 items-start">
          {/* Client */}
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 text-green-700 px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-5">
              Your client · between sessions
            </span>
            <PhoneOutline />
            <p className="text-slate-600 text-sm leading-relaxed font-light text-center mt-5 max-w-[260px]">
              Texts or voice notes on WhatsApp, Telegram, or a quick call. Apps they already open, so it keeps happening.
            </p>
          </div>

          <Arrow label="Shared with consent" />

          {/* Empath */}
          <div className="flex flex-col items-center md:pt-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-5">
              Empath · synthesizes
            </span>
            <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 shadow-xl flex items-center justify-center">
              <div className="absolute inset-2 rounded-full bg-white/10 border border-white/30" />
              <Sparkles className="w-14 h-14 text-white relative" aria-hidden="true" />
            </div>
            <ul className="mt-6 flex flex-wrap justify-center gap-2 max-w-[260px]">
              {signals.map((s) => (
                <li key={s} className="rounded-full bg-white border border-slate-200 shadow-sm px-3 py-1 text-xs text-slate-700">
                  {s}
                </li>
              ))}
            </ul>
            <p className="text-slate-600 text-sm leading-relaxed font-light text-center mt-5 max-w-[260px]">
              Patterns, not transcripts. Encrypted, never used to train AI, and your client decides what you see.
            </p>
          </div>

          <Arrow label="3-minute brief" />

          {/* Therapist */}
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-300 text-slate-700 px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-5">
              You · before the session
            </span>
            <DashboardOutline />
            <p className="text-slate-600 text-sm leading-relaxed font-light text-center mt-5 max-w-[260px]">
              Open the dashboard, read the brief, walk in knowing what shifted this week. No raw data dump.
            </p>
          </div>
        </div>

        {/* Loop back */}
        <div className="mt-12 flex items-center justify-center gap-4" aria-hidden="true">
          <span className="hidden md:block flex-1 max-w-xs border-t-2 border-dashed border-slate-300" />
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 shadow-sm px-4 py-2 text-sm text-slate-700">
            <Repeat className="w-4 h-4 text-indigo-600" />
            A session that lands makes clients keep sharing, so next week's brief is richer
          </span>
          <span className="hidden md:block flex-1 max-w-xs border-t-2 border-dashed border-slate-300" />
        </div>
        <figcaption className="sr-only">
          Empath is a supplement to therapy: it carries context between sessions so that both the client and the therapist arrive better prepared.
        </figcaption>
      </figure>

      {/* Both sides */}
      <div className="grid md:grid-cols-2 gap-6 mt-14 max-w-4xl mx-auto">
        <div className="rounded-xl bg-white border border-green-100 shadow-sm p-7">
          <h3 className="text-lg font-medium text-slate-900 mb-4">What your client gets</h3>
          <ul className="space-y-3 text-slate-600 font-light">
            {[
              'A place to put the week down as it happens, instead of reconstructing it on the couch',
              'A companion that listens at 10 PM and remembers for Thursday',
              'Control over exactly what reaches their therapist',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-white border border-indigo-100 shadow-sm p-7">
          <h3 className="text-lg font-medium text-slate-900 mb-4">What you get</h3>
          <ul className="space-y-3 text-slate-600 font-light">
            {[
              'The first fifteen minutes back, because catch-up already happened',
              'Patterns across weeks that no single session can surface',
              'More of the hour for the work only a human can do',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-center text-slate-500 text-sm font-light mt-8 max-w-2xl mx-auto">
        Empath never diagnoses, never sits in on the session, and never replaces it. It supplements the work so that
        more of it happens.
      </p>
    </div>
  );
}
