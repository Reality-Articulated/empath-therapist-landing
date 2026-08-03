// One-day cross-channel story for the landing page: a journal entry made in
// the app, then follow-up questions from WhatsApp, Telegram, and Instagram —
// each mini chat styled like that platform's real DM UI, all answered from
// the same journal memory. Conversations are fictional/composed. All copy
// lives in the i18n catalog so it localizes.
import { ReactNode } from 'react';
import { Mic, Instagram } from 'lucide-react';
import { WhatsAppIcon, TelegramIcon } from './ChannelIcons';
import { useJournalingCopy } from '../i18n/copy';

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

interface ChannelVisual {
  icon: ReactNode;
  /** Rail node tile */
  bg: string;
  shadow: string;
  platform: Platform;
}

// Per-channel styling registry — the step copy (times, messages) comes from
// the locale catalog and is matched to a visual by its `key`.
const CHANNEL_VISUALS: Record<string, ChannelVisual> = {
  whatsapp: {
    icon: <WhatsAppIcon className="w-5 h-5" />,
    bg: '#25D366',
    shadow: '#1a9e4d',
    platform: { name: 'WhatsApp', frame: '#0b141a', header: '#1f2c34', inBg: '#202c33', outBg: '#005c4b' },
  },
  telegram: {
    icon: <TelegramIcon className="w-5 h-5" />,
    bg: '#229ED9',
    shadow: '#1a7eb0',
    platform: { name: 'Telegram', frame: '#0e1621', header: '#17212b', inBg: '#182533', outBg: '#2b5278' },
  },
  instagram: {
    icon: <Instagram className="w-5 h-5" />,
    bg: '#E4405F',
    shadow: '#b32945',
    platform: {
      name: 'Instagram',
      frame: '#000000',
      header: '#121212',
      inBg: '#262626',
      outBg: 'linear-gradient(135deg, #405de6 0%, #833ab4 55%, #e1306c 100%)',
    },
  },
};

const MiniChat = ({ visual, userMsg, empathMsg }: { visual: ChannelVisual; userMsg: string; empathMsg: string }) => {
  const p = visual.platform;
  return (
    <div className="rounded-xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] overflow-hidden max-w-md">
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: p.header }}>
        <span className="text-white/80">{visual.icon}</span>
        <span className="text-white/90 text-xs font-bold">{p.name}</span>
      </div>
      <div className="flex flex-col gap-2 p-3" style={{ background: p.frame }}>
        <div
          className="self-end max-w-[85%] rounded-lg rounded-tr-[2px] px-2.5 py-1.5 text-[13px] leading-snug text-white"
          style={{ background: p.outBg }}
        >
          {userMsg}
        </div>
        <div
          className="self-start max-w-[85%] rounded-lg rounded-tl-[2px] px-2.5 py-1.5 text-[13px] leading-snug text-[#e9edef]"
          style={{ background: p.inBg }}
        >
          {empathMsg}
        </div>
      </div>
    </div>
  );
};

/**
 * Vertical timeline: journal entry → WhatsApp → Telegram → Instagram, one
 * memory thread across a day. Section chrome lives in the embedding page.
 */
export default function CrossChannelStory({ className = '' }: { className?: string }) {
  const { crossChannel } = useJournalingCopy();
  const journal = crossChannel.journalStep;

  return (
    <div className={`relative max-w-2xl mx-auto ${className}`}>
      {/* rail connecting the channel nodes */}
      <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-stone-300" aria-hidden="true" />
      <div className="space-y-10">
        {/* Journal entry — where the memory starts */}
        <div className="relative flex gap-5">
          <div
            className="relative z-10 w-10 h-10 rounded-xl border-2 flex items-center justify-center text-white shrink-0"
            style={{ backgroundColor: '#1c1917', borderColor: '#1c1917', boxShadow: '4px 4px 0px 0px #1b8af1' }}
            aria-hidden="true"
          >
            <Mic className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
              {journal.time} · <span style={{ color: '#1b8af1' }}>{journal.channel}</span>
            </p>
            <div className="bg-white rounded-xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] p-5 max-w-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-[#1b8af1] rounded-full flex items-center justify-center shrink-0">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-stone-900 text-sm">{journal.cardTitle}</p>
                  <p className="text-xs text-stone-500">{journal.cardSub}</p>
                </div>
              </div>
              <p className="text-stone-700 text-sm leading-relaxed italic">{journal.quote}</p>
            </div>
          </div>
        </div>

        {/* The same memory picked up from three different apps */}
        {crossChannel.steps.map((step) => {
          const visual = CHANNEL_VISUALS[step.key];
          if (!visual) return null;
          return (
            <div key={step.key} className="relative flex gap-5">
              <div
                className="relative z-10 w-10 h-10 rounded-xl border-2 flex items-center justify-center text-white shrink-0"
                style={{
                  backgroundColor: visual.bg,
                  borderColor: visual.bg,
                  boxShadow: `4px 4px 0px 0px ${visual.shadow}`,
                }}
                aria-hidden="true"
              >
                {visual.icon}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                  {step.time} · <span style={{ color: visual.shadow }}>{step.channel}</span>
                </p>
                <MiniChat visual={visual} userMsg={step.userMsg} empathMsg={step.empathMsg} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
