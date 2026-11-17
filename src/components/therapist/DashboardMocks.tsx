import React from 'react';
import {
  Sparkles,
  MessageCircle,
  MessageSquare,
  Mic,
  Users,
  Moon,
  Lightbulb,
  TrendingUp,
  StickyNote,
  FileText,
  Activity,
  KeyRound,
  Clock,
  ArrowRight,
  ArrowDown,
  Heart,
  ShieldCheck,
  Send,
  Zap,
  ChevronRight,
  ScrollText,
  Volume2,
} from 'lucide-react';

/**
 * Coded replicas of the real therapist dashboard (empath-heroku/frontend) for
 * the /therapist landing page. They mirror the product's panels, labels, and
 * colors with one fictional client, so they stay sharp at every screen size
 * and can never leak real client data. Everything here is static markup:
 * decorative for assistive tech (each replica is one labelled image).
 *
 * If the dashboard's panels change, update the matching replica here:
 *   DashboardPreview  -> ClientSidebar + ClientHeader + Summary ("INSIGHTS")
 *   StandOutMock      -> MoodHighlights ("What Stands Out")
 *   AskDataMock       -> chat/ClientDataChatDrawer ("Chat With Data")
 *   CaseCompassMock   -> CaseCompass
 */

// Mood colors used by the dashboard's "What Stands Out" chart (low to good).
const MOOD = {
  low: '#e11d48',
  lowish: '#fb7185',
  neutral: '#a8a29e',
  goodish: '#34d399',
  good: '#059669',
};

const moodPoints = [
  { x: 10, y: 40, c: MOOD.neutral },
  { x: 50, y: 34, c: MOOD.goodish },
  { x: 90, y: 46, c: MOOD.neutral },
  { x: 130, y: 66, c: MOOD.lowish },
  { x: 170, y: 76, c: MOOD.low },
  { x: 210, y: 44, c: MOOD.neutral },
  { x: 250, y: 28, c: MOOD.goodish },
  { x: 290, y: 20, c: MOOD.good },
];

const MoodChart = ({ className }: { className: string }) => (
  <svg viewBox="0 0 300 96" className={className} aria-hidden="true">
    <line x1="0" y1="48" x2="300" y2="48" stroke="#d6d3d1" strokeWidth="1" strokeDasharray="4 4" />
    <polyline
      points={moodPoints.map((p) => `${p.x},${p.y}`).join(' ')}
      fill="none"
      stroke="#a8a29e"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {moodPoints.map((p) => (
      <circle key={p.x} cx={p.x} cy={p.y} r="5" fill={p.c} stroke="#ffffff" strokeWidth="1.5" />
    ))}
  </svg>
);

const MoodLegend = () => (
  <div className="flex items-center gap-3 text-[11px] text-stone-500 font-medium">
    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: MOOD.low }} />Low</span>
    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: MOOD.neutral }} />Neutral</span>
    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: MOOD.good }} />Good</span>
  </div>
);

/** Site-style frame (2px border, hard shadow) around a dashboard-style panel. */
const Frame = ({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) => (
  <figure
    role="img"
    aria-label={label}
    className={`m-0 rounded-xl border-2 border-stone-900 bg-white shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] overflow-hidden text-left ${className ?? ''}`}
  >
    <div aria-hidden="true">{children}</div>
  </figure>
);

const BrowserBar = ({ title }: { title: string }) => (
  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-stone-900">
    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
    <span className="ml-3 text-xs text-stone-300 font-medium truncate">{title}</span>
  </div>
);

const CitationPill = ({ n }: { n: number }) => (
  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-blue-50 text-[#0f6fd6] text-[11px] font-semibold">
    {n}
  </span>
);

const sidebarClients = [
  { initials: 'JM', name: 'Jordan M.', seen: 'Active today', selected: true },
  { initials: 'AR', name: 'Alex R.', seen: 'Active yesterday', selected: false },
];

const insightPatterns = [
  {
    icon: Users,
    color: '#C2410C',
    name: 'Conflict with mom repeats',
    badge: 'interpersonal',
    cites: [2, 5],
    description: 'Three calls this period ended in the same argument about moving home.',
    analysis: 'Each one was followed by a low-mood entry within a day.',
  },
  {
    icon: ShieldCheck,
    color: '#0D9488',
    name: 'Walks after hard days',
    badge: 'coping',
    cites: [4, 6],
    description: 'Evening walks show up on four of the rougher days.',
    analysis: 'Mood the next morning is rated higher when a walk is mentioned.',
  },
];

/**
 * Hero replica: the client view a therapist opens before a session. Sidebar
 * is hidden below md so the main column stays readable on a phone.
 */
export function DashboardPreview() {
  return (
    <Frame
      className="max-w-5xl mx-auto"
      label="Example of the Empath therapist dashboard for a fictional client, Jordan M. A sidebar lists clients and a connect code. The main view shows the client header with Ask about client, Notes, and Documents buttons, an Insights card with two patterns that cite journal entries, and a What Stands Out mood chart with two findings."
    >
      <BrowserBar title="app.empathdash.com" />
      <div className="flex bg-[#FAF9F6]">
        {/* Sidebar */}
        <div className="hidden md:flex w-56 flex-shrink-0 flex-col border-r border-stone-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Clients</span>
            <span className="text-[11px] font-semibold text-stone-600 bg-stone-100 rounded-full px-2 py-0.5">2/2 seats</span>
          </div>
          <div className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs text-stone-400 mb-3">Search...</div>
          <div className="space-y-1">
            {sidebarClients.map((client) => (
              <div
                key={client.name}
                className={`relative flex items-center gap-2.5 rounded-lg px-3 py-2 ${client.selected ? 'bg-blue-50' : ''}`}
              >
                {client.selected && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-[#1b8af1]" />}
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1b8af1] to-[#0e58ad] text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                  {client.initials}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-stone-900 truncate">{client.name}</span>
                  <span className="block text-[11px] text-stone-500">{client.seen}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-6">
            <div className="rounded-lg border border-stone-200 p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-500 mb-1">
                <KeyRound className="w-3.5 h-3.5" />
                Your connect code
              </div>
              <div className="text-base font-semibold tracking-[0.2em] text-stone-900">K7M2QX</div>
            </div>
          </div>
        </div>

        {/* Main column */}
        <div className="flex-1 min-w-0 p-4 md:p-5 space-y-4">
          {/* Client header */}
          <div className="rounded-2xl bg-white border border-stone-200 p-4 md:p-5">
            <div className="flex items-center gap-4">
              <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1b8af1] to-[#0e58ad] text-white text-lg font-serif font-bold flex items-center justify-center flex-shrink-0">
                JM
              </span>
              <div className="min-w-0">
                <div className="text-xl md:text-2xl font-serif font-bold text-stone-900 leading-tight">Jordan M.</div>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  Active today · Sharing the last 14 days
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-stone-100">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#1b8af1] to-[#0f6fd6] text-white text-xs font-semibold px-3 py-2">
                <Sparkles className="w-3.5 h-3.5" /> Ask about client
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 text-xs font-semibold px-3 py-2">
                <StickyNote className="w-3.5 h-3.5" /> Notes
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 text-xs font-semibold px-3 py-2">
                <FileText className="w-3.5 h-3.5" /> Documents
              </span>
            </div>
          </div>

          {/* Insights (the written brief + cited patterns) */}
          <div className="relative rounded-2xl bg-white border border-stone-200 p-4 md:p-5 pt-6">
            <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1 rounded-full bg-[#1b8af1] text-white text-[10px] font-bold tracking-wider px-2.5 py-0.5">
              <Sparkles className="w-3 h-3" /> INSIGHTS
            </span>
            <div className="flex items-center justify-end gap-2 mb-3">
              <span className="inline-flex items-center gap-1 rounded-lg border border-stone-200 text-stone-700 text-[11px] font-semibold px-2.5 py-1.5">
                <ScrollText className="w-3.5 h-3.5" /> Summary
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg bg-[#1b8af1] text-white text-[11px] font-semibold px-2.5 py-1.5">
                <Volume2 className="w-3.5 h-3.5" /> Audio Summary
              </span>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed mb-4">
              A steadier fortnight overall, with a dip midweek that followed two short nights and a tense call with
              mom. Jordan wants to talk about that call on Thursday.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {insightPatterns.map((pattern) => (
                <div
                  key={pattern.name}
                  className="rounded-xl border border-stone-200 bg-white p-3"
                  style={{ borderLeft: `3px solid ${pattern.color}` }}
                >
                  <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                    <pattern.icon className="w-4 h-4 flex-shrink-0" style={{ color: pattern.color }} />
                    <span className="text-sm font-semibold text-stone-900">{pattern.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap mb-2">
                    <span
                      className="text-[10px] font-semibold rounded-full px-2 py-0.5"
                      style={{ color: pattern.color, background: `${pattern.color}14` }}
                    >
                      {pattern.badge}
                    </span>
                    <span className="text-[11px] text-stone-500">Journals:</span>
                    {pattern.cites.map((n) => (
                      <CitationPill key={n} n={n} />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">{pattern.description}</p>
                  <p className="text-xs text-stone-500 leading-relaxed mt-1">{pattern.analysis}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What Stands Out */}
          <div className="rounded-2xl bg-white border border-stone-200 p-4 md:p-5">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0f6fd6]" />
                <span className="text-base font-semibold tracking-tight text-stone-900">What Stands Out</span>
              </div>
              <MoodLegend />
            </div>
            <MoodChart className="w-full h-24" />
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <div className="flex items-start gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-stone-900">A sharp swing within 2 days</span>
                  <span className="block text-xs text-stone-500">From the lowest point to a good day by Friday.</span>
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-stone-900">“mom” runs through the low days</span>
                  <span className="block text-xs text-stone-500">Named in 3 of the 4 lowest entries.</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/** Step 1: the client's side. Empath only acknowledges and saves. */
export function CapturePhoneMock() {
  return (
    <figure
      role="img"
      aria-label="A client's phone. At 10:42 PM on Tuesday they text Empath that they barely slept and argued with their mom, then send a 48 second voice note. Empath replies only to confirm each entry is saved and kept for Thursday's session."
      className="m-0"
    >
      <div
        aria-hidden="true"
        className="relative mx-auto w-[260px] h-[430px] rounded-[2.25rem] border-2 border-stone-900 bg-white shadow-[8px_8px_0px_0px_#1b8af1] overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-stone-900 rounded-b-2xl" />
        <div className="absolute inset-x-0 top-8 bottom-0 px-4 pt-3 pb-4 flex flex-col gap-3 text-[13px] leading-snug text-left">
          <div className="text-center text-[11px] text-stone-400 font-medium">Tue 10:42 PM</div>
          <div className="self-end max-w-[85%] rounded-2xl rounded-br-sm bg-green-500 text-white px-3 py-2">
            Barely slept again. Mom called and it turned into the same fight.
          </div>
          <div className="self-start max-w-[85%] rounded-2xl rounded-bl-sm bg-stone-100 text-stone-800 px-3 py-2">
            Got it. Saved to your journal.
          </div>
          <div className="self-end w-[75%] rounded-2xl rounded-br-sm bg-green-500 text-white px-3 py-2.5 flex items-center gap-2">
            <Mic className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 flex items-center gap-[3px]">
              {[3, 6, 9, 5, 8, 4, 7, 3, 6, 8, 4, 6].map((h, i) => (
                <span key={i} className="w-[2px] bg-white/90 rounded-full" style={{ height: `${h * 2}px` }} />
              ))}
            </span>
            <span className="text-[11px]">0:48</span>
          </div>
          <div className="self-start max-w-[85%] rounded-2xl rounded-bl-sm bg-stone-100 text-stone-800 px-3 py-2">
            Noted. I'll keep this for your session Thursday if you want to bring it up.
          </div>
          <div className="mt-auto flex items-center gap-2 rounded-full border-2 border-stone-200 px-3 py-2 text-stone-400">
            <MessageCircle className="w-4 h-4" />
            <span>Message</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

const rawInputs = [
  { icon: MessageCircle, label: 'Text', detail: 'Tue 10:42 PM' },
  { icon: Mic, label: 'Voice note', detail: '0:48' },
  { icon: Moon, label: 'Apple Health sleep', detail: '4h 50m · opted in' },
];

const signals = ['Mood trend', 'Sleep × mood', 'People mentioned', 'Signals worth raising'];

/** Step 2: raw entries in, a short list of signals out. */
export function SignalsMock() {
  return (
    <Frame label="Three raw inputs from a client, a text, a voice note, and Apple Health sleep data, are synthesized by Empath into four signals: mood trend, sleep against mood, people mentioned, and signals worth raising.">
      <div className="p-6 bg-[#FAF9F6]">
        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-3">This week, as shared</div>
        <div className="space-y-2">
          {rawInputs.map((input) => (
            <div key={input.label} className="flex items-center gap-3 rounded-xl bg-white border border-stone-200 px-3 py-2.5">
              <span className="w-8 h-8 rounded-lg bg-stone-100 text-stone-600 flex items-center justify-center flex-shrink-0">
                <input.icon className="w-4 h-4" />
              </span>
              <span className="text-sm font-semibold text-stone-900">{input.label}</span>
              <span className="ml-auto text-xs text-stone-500">{input.detail}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 my-4 text-stone-400">
          <ArrowDown className="w-5 h-5" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1b8af1] text-white text-[11px] font-bold tracking-wider px-3 py-1">
            <Sparkles className="w-3.5 h-3.5" /> EMPATH SYNTHESIZES
          </span>
          <ArrowDown className="w-5 h-5" />
        </div>

        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-3">What reaches you</div>
        <div className="grid grid-cols-2 gap-2">
          {signals.map((signal) => (
            <div key={signal} className="rounded-xl bg-white border border-stone-200 px-3 py-2.5 text-sm font-semibold text-stone-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b8af1] flex-shrink-0" />
              {signal}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/** Step 3: the brief a therapist reads before the client sits down. */
export function BriefMock() {
  return (
    <Frame label="A pre-session brief for fictional client J.M., session 12, Thursday at 2 PM, a three minute read. Mood dipped midweek and is recovering, in line with two short nights. Sleep was under five hours on three of seven nights. Mom came up four times this week, each time with frustration. Worth raising: the client wants to talk about the Tuesday call.">
      <BrowserBar title="app.empathdash.com · Pre-session brief" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="font-semibold text-stone-900">J.M. · Session 12</p>
            <p className="text-stone-500 text-xs mt-0.5">Thursday 2:00 PM · 3-minute read</p>
          </div>
          <span className="rounded-full bg-blue-50 text-[#0f6fd6] px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap">Brief ready</span>
        </div>
        <div className="rounded-xl border border-stone-200 p-3 mb-4">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-stone-600">
              <TrendingUp className="w-3.5 h-3.5" /> Mood, last 14 days
            </span>
            <MoodLegend />
          </div>
          <MoodChart className="w-full h-20" />
          <p className="text-xs text-stone-500 mt-1">Dip Wed to Thu, recovering since. Lines up with two short nights.</p>
        </div>
        <ul className="space-y-2.5 text-sm text-stone-700">
          <li className="flex items-start gap-2.5">
            <Moon className="w-4 h-4 mt-0.5 text-[#1b8af1] flex-shrink-0" />
            <span>Sleep under 5h on 3 of 7 nights (Apple Health, opted in)</span>
          </li>
          <li className="flex items-start gap-2.5">
            <Users className="w-4 h-4 mt-0.5 text-[#1b8af1] flex-shrink-0" />
            <span>Mom came up 4 times this week, each time with frustration</span>
          </li>
          <li className="flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
            <span>Worth raising: wants to talk about the Tuesday call</span>
          </li>
        </ul>
      </div>
    </Frame>
  );
}

const EntryChip = ({ color, title, date }: { color: string; title: string; date: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-2 py-1 text-[11px] text-stone-700">
    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
    <span className="font-semibold">{title}</span>
    <span className="text-stone-400">{date}</span>
    <ChevronRight className="w-3 h-3 text-stone-400" />
  </span>
);

/** "What Stands Out": mood shifts and recurring triggers, linked to entries. */
export function StandOutMock() {
  return (
    <Frame label="The What Stands Out panel: a chart of how the client rated their own mood across shared entries, with two findings, a sharp swing within two days and the word mom running through the low days, each linked to the journal entries behind it.">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-[#0f6fd6]" />
          <span className="text-base font-semibold tracking-tight text-stone-900">What Stands Out</span>
        </div>
        <p className="text-xs text-stone-500 mb-2">How Jordan rated their own mood across 8 shared entries.</p>
        <MoodLegend />
        <MoodChart className="w-full h-24 mt-1" />
        <div className="space-y-3 mt-3">
          <div className="flex items-start gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-stone-900">A sharp swing within 2 days</span>
              <span className="flex flex-wrap gap-1.5 mt-1.5">
                <EntryChip color={MOOD.low} title="Same fight" date="Sep 10" />
                <EntryChip color={MOOD.goodish} title="Long walk" date="Sep 12" />
              </span>
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-stone-900">“mom” runs through the low days</span>
              <span className="flex flex-wrap gap-1.5 mt-1.5">
                <EntryChip color={MOOD.lowish} title="Barely slept" date="Sep 9" />
              </span>
            </span>
          </div>
        </div>
        <p className="text-[11px] text-stone-400 mt-4">Based only on entries shared with you, using the mood the client set on each one.</p>
      </div>
    </Frame>
  );
}

/** "Chat With Data": ask about a client's shared entries, get cited answers. */
export function AskDataMock() {
  return (
    <Frame label="The Chat With Data panel. The therapist asks what came up around sleep this week. The answer says there were three short nights, each after a tense call with mom, and that step count fell on the same days, with citations to two journal entries and one health metric.">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-stone-200">
        <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#0f6fd6] flex items-center justify-center flex-shrink-0">
          <MessageSquare className="w-4 h-4" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-stone-900">Chat With Data</span>
          <span className="block text-[11px] text-stone-500">Jordan's Data</span>
        </span>
      </div>
      <div className="p-5 bg-[#FAF9F6] space-y-3 text-sm">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[#0f6fd6] text-white px-3.5 py-2.5">
          What came up around sleep this week?
        </div>
        <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-white border border-stone-200 text-stone-700 px-3.5 py-2.5 leading-relaxed">
          Three short nights, each after a tense call with mom{' '}
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-1.5 py-0.5 align-middle">
            <FileText className="w-3 h-3" />J-3
          </span>{' '}
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-1.5 py-0.5 align-middle">
            <FileText className="w-3 h-3" />J-5
          </span>
          . Step count fell on the same days{' '}
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-[#0f6fd6] text-[11px] font-semibold px-1.5 py-0.5 align-middle">
            <Activity className="w-3 h-3" />M-2
          </span>
          .
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-xs text-stone-400">
          <span className="flex-1 truncate">Ask about client patterns...</span>
          <span className="w-7 h-7 rounded-lg bg-stone-800 text-white flex items-center justify-center flex-shrink-0">
            <Send className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Frame>
  );
}

const compassTabs = ['Session Focus', 'Hypotheses', 'Interventions', 'Homework', 'Risk Factors'];

/** "Case Compass": session prep ideas that cite entries. */
export function CaseCompassMock() {
  return (
    <Frame label="The Case Compass panel, with tabs for Session Focus, Hypotheses, Interventions, Homework, and Risk Factors. Session Focus is open and lists two priorities: the recurring argument with mom, and how short sleep follows evening conflict.">
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
          <div>
            <span className="block text-base font-semibold tracking-tight text-stone-900">Case Compass</span>
            <span className="block text-xs text-stone-500">Insights to guide your session</span>
          </div>
          <span className="rounded-full bg-stone-100 text-stone-600 text-[10px] font-semibold px-2 py-1">AI-generated · cites entries</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {compassTabs.map((tab, i) => (
            <span
              key={tab}
              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${
                i === 0 ? 'bg-blue-50 text-[#0f6fd6] border border-blue-200' : 'bg-white text-stone-500 border border-stone-200'
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#1b8af1]" />
          <span className="text-sm font-semibold text-stone-900">Priority Session Focus</span>
        </div>
        <div className="space-y-2.5">
          <div className="rounded-xl border border-stone-200 p-3">
            <p className="text-sm font-semibold text-stone-900">The recurring argument with mom</p>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">Raised in three entries and flagged by Jordan for Thursday.</p>
          </div>
          <div className="rounded-xl border border-stone-200 p-3">
            <p className="text-sm font-semibold text-stone-900">Short sleep after evening conflict</p>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">Each night under five hours followed a late call.</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-4">
          <ArrowRight className="w-3 h-3" /> Up to three items per tab, each one copyable
        </div>
      </div>
    </Frame>
  );
}
