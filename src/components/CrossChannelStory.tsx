// One-day cross-channel story for the landing page: a journal entry made in
// the app, then follow-up questions from WhatsApp, Telegram, and Instagram —
// each mini chat styled like that platform's real DM UI, all answered from
// the same journal memory. Conversations are fictional/composed.
import { Mic, Instagram } from 'lucide-react';
import { WhatsAppIcon, TelegramIcon } from './ChannelIcons';

interface Platform {
  name: string;
  /** Chat backdrop */
  frame: string;
  /** Header strip */
  header: string;
  /** Incoming (Empath) bubble */
  inBg: string;
  /** Outgoing (user) bubble — any CSS background, gradients welcome */
  outBg: string;
}

const PLATFORMS: Record<'whatsapp' | 'telegram' | 'instagram', Platform> = {
  whatsapp: { name: 'WhatsApp', frame: '#0b141a', header: '#1f2c34', inBg: '#202c33', outBg: '#005c4b' },
  telegram: { name: 'Telegram', frame: '#0e1621', header: '#17212b', inBg: '#182533', outBg: '#2b5278' },
  instagram: {
    name: 'Instagram',
    frame: '#000000',
    header: '#121212',
    inBg: '#262626',
    outBg: 'linear-gradient(135deg, #405de6 0%, #833ab4 55%, #e1306c 100%)',
  },
};

interface Step {
  key: string;
  /** Rail node tile */
  node: { icon: React.ReactNode; bg: string; shadow: string };
  /** "Wednesday 8:04 AM" */
  time: string;
  /** Channel name, colored to match the node */
  channel: string;
  channelColor: string;
  platform?: Platform;
  userMsg?: string;
  empathMsg?: string;
}

const STEPS: Step[] = [
  {
    key: 'journal',
    node: { icon: <Mic className="w-5 h-5" />, bg: '#1c1917', shadow: '#1b8af1' },
    time: 'Tuesday 9:41 PM',
    channel: 'Voice journal',
    channelColor: '#1b8af1',
  },
  {
    key: 'whatsapp',
    node: { icon: <WhatsAppIcon className="w-5 h-5" />, bg: '#25D366', shadow: '#1a9e4d' },
    time: 'Wednesday 8:04 AM',
    channel: 'WhatsApp',
    channelColor: '#1a9e4d',
    platform: PLATFORMS.whatsapp,
    userMsg: 'morning. was i being dramatic last night?',
    empathMsg:
      'A little 💛 You rehearsed the intro four times. But you also said you know this material better than anyone — hold onto that part today.',
  },
  {
    key: 'telegram',
    node: { icon: <TelegramIcon className="w-5 h-5" />, bg: '#229ED9', shadow: '#1a7eb0' },
    time: 'Wednesday 2:37 PM',
    channel: 'Telegram',
    channelColor: '#1a7eb0',
    platform: PLATFORMS.telegram,
    userMsg: "presentation done, it went fine. why do i always spiral the night before?",
    empathMsg:
      "That's the third night-before spiral in your journal since May — and all three went fine the next day. The pattern is the spiral, not the failing.",
  },
  {
    key: 'instagram',
    node: { icon: <Instagram className="w-5 h-5" />, bg: '#E4405F', shadow: '#b32945' },
    time: 'Wednesday 11:20 PM',
    channel: 'Instagram',
    channelColor: '#b32945',
    platform: PLATFORMS.instagram,
    userMsg: "can't sleep. saw a reel about imposter syndrome and felt extremely seen",
    empathMsg:
      "Adding it to today's entry. For what it's worth, your own journal disagrees with the reel: you're three for three this month.",
  },
];

const MiniChat = ({ step }: { step: Step }) => {
  const p = step.platform!;
  return (
    <div className="rounded-xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] overflow-hidden max-w-md">
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: p.header }}>
        <span className="text-white/80">{step.node.icon}</span>
        <span className="text-white/90 text-xs font-bold">{p.name}</span>
      </div>
      <div className="flex flex-col gap-2 p-3" style={{ background: p.frame }}>
        <div
          className="self-end max-w-[85%] rounded-lg rounded-tr-[2px] px-2.5 py-1.5 text-[13px] leading-snug text-white"
          style={{ background: p.outBg }}
        >
          {step.userMsg}
        </div>
        <div
          className="self-start max-w-[85%] rounded-lg rounded-tl-[2px] px-2.5 py-1.5 text-[13px] leading-snug text-[#e9edef]"
          style={{ background: p.inBg }}
        >
          {step.empathMsg}
        </div>
      </div>
    </div>
  );
};

const JournalCard = () => (
  <div className="bg-white rounded-xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] p-5 max-w-md">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-9 h-9 bg-[#1b8af1] rounded-full flex items-center justify-center shrink-0">
        <Mic className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="font-bold text-stone-900 text-sm">Night before the presentation</p>
        <p className="text-xs text-stone-500">Voice journal · 2 min</p>
      </div>
    </div>
    <p className="text-stone-700 text-sm leading-relaxed italic">
      "I keep rehearsing the intro. What if I just blank out in front of everyone tomorrow? I know
      this material better than anyone on the team, but my brain won't accept it..."
    </p>
  </div>
);

/**
 * Vertical timeline: journal entry → WhatsApp → Telegram → Instagram, one
 * memory thread across a day. Section chrome lives in the embedding page.
 */
export default function CrossChannelStory({ className = '' }: { className?: string }) {
  return (
    <div className={`relative max-w-2xl mx-auto ${className}`}>
      {/* rail connecting the channel nodes */}
      <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-stone-300" aria-hidden="true" />
      <div className="space-y-10">
        {STEPS.map((step) => (
          <div key={step.key} className="relative flex gap-5">
            <div
              className="relative z-10 w-10 h-10 rounded-xl border-2 flex items-center justify-center text-white shrink-0"
              style={{
                backgroundColor: step.node.bg,
                borderColor: step.node.bg,
                boxShadow: `4px 4px 0px 0px ${step.node.shadow}`,
              }}
              aria-hidden="true"
            >
              {step.node.icon}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                {step.time} · <span style={{ color: step.channelColor }}>{step.channel}</span>
              </p>
              {step.platform ? <MiniChat step={step} /> : <JournalCard />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
