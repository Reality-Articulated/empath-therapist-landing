// WhatsApp-style example conversations for the landing page, rebuilt in
// JSX from the ad creatives in marketing/whatsapp-creatives (c1–c4) so they
// render crisp at any size instead of shipping 1080×1350 PNGs.
// Conversations are fictional/composed — no real user content. All copy
// (including the chats) lives in the i18n catalog so it localizes.
import { useJournalingCopy } from '../i18n/copy';
import { ChatMessage, JournalingCopy } from '../i18n/copy/journaling.en';

type ChatExample = JournalingCopy['whatsappSection']['examples'][number];
type ChatUi = JournalingCopy['whatsappSection']['chatUi'];

// WhatsApp's real read-receipt double tick
const Ticks = () => (
  <svg className="w-3.5 h-2.5 shrink-0" viewBox="0 0 24 14" aria-hidden="true">
    <g stroke="#53bdeb" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.6 8 5.6 12 13.4 2.6" />
      <path d="M6.6 8 10.6 12 18.4 2.6" />
    </g>
  </svg>
);

// WhatsApp's curved bubble-tail shape (same SVGs as the ad creatives)
const TAIL_IN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 13'%3E%3Cpath fill='%23202c33' d='M1.533 2.568 8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z'/%3E%3C/svg%3E\")";
const TAIL_OUT =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 13'%3E%3Cpath fill='%23005c4b' d='M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z'/%3E%3C/svg%3E\")";

// Static waveform heights from the c2 creative, scaled to the card size
const WAVE_HEIGHTS = [22, 38, 54, 70, 62, 44, 30, 50, 72, 66, 48, 28, 36, 58, 74, 60, 42, 26, 40, 64, 70, 52, 32, 24, 46, 68, 72, 56];
const WAVE_PLAYED = 14;

const VoiceBubble = ({ msg }: { msg: ChatMessage }) => (
  <div
    className="relative self-end max-w-[88%] w-60 rounded-lg rounded-tr-[2px] bg-[#005c4b] px-2.5 pt-2.5 pb-5 shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
    style={{ backgroundImage: 'none' }}
  >
    <span
      className="absolute top-0 -right-[7px] w-2 h-[13px] bg-no-repeat"
      style={{ backgroundImage: TAIL_OUT, backgroundSize: '100% 100%' }}
      aria-hidden="true"
    />
    <div className="flex items-center gap-1.5">
      <span
        className="shrink-0 w-0 h-0 border-l-[11px] border-l-[#8696a0] border-y-[7px] border-y-transparent"
        aria-hidden="true"
      />
      <div className="flex items-center gap-[2px] flex-1 h-6" aria-label={`Voice note, ${msg.duration}`}>
        {WAVE_HEIGHTS.map((v, i) => (
          <span key={i} className="contents">
            {i === WAVE_PLAYED && <span className="shrink-0 w-2.5 h-2.5 -mx-[2px] rounded-full bg-[#53bdeb]" />}
            <span
              className="block w-[2px] rounded-full"
              style={{
                height: `${Math.max(3, Math.round((v / 74) * 22))}px`,
                backgroundColor: i < WAVE_PLAYED ? '#53bdeb' : 'rgba(233,237,239,0.45)',
              }}
            />
          </span>
        ))}
      </div>
    </div>
    <span className="absolute left-7 bottom-1 text-[9px] text-white/60">{msg.duration}</span>
    <span className="absolute right-2 bottom-1 text-[9px] text-white/60 flex items-center gap-0.5">
      {msg.time}
      <Ticks />
    </span>
  </div>
);

const TextBubble = ({ msg }: { msg: ChatMessage }) => {
  const out = msg.from === 'user';
  return (
    <div
      className={`relative max-w-[85%] rounded-lg px-2.5 py-1.5 text-[13px] leading-snug text-[#e9edef] shadow-[0_1px_1px_rgba(0,0,0,0.25)] ${
        out ? 'self-end bg-[#005c4b] rounded-tr-[2px]' : 'self-start bg-[#202c33] rounded-tl-[2px]'
      }`}
    >
      <span
        className={`absolute top-0 w-2 h-[13px] bg-no-repeat ${out ? '-right-[7px]' : '-left-[7px]'}`}
        style={{ backgroundImage: out ? TAIL_OUT : TAIL_IN, backgroundSize: '100% 100%' }}
        aria-hidden="true"
      />
      {msg.text}
      {/* inline spacer keeps the last line clear of the timestamp */}
      <span className={`inline-block ${out ? 'w-16' : 'w-12'}`} aria-hidden="true" />
      <span
        className={`absolute right-2 bottom-[5px] text-[9px] flex items-center gap-0.5 whitespace-nowrap ${
          out ? 'text-white/60' : 'text-[#8696a0]'
        }`}
      >
        {msg.time}
        {out && <Ticks />}
      </span>
    </div>
  );
};

const ChatCard = ({ example, ui }: { example: ChatExample; ui: ChatUi }) => (
  <div className="snap-center shrink-0 w-[280px] md:w-auto md:shrink">
    <div className="rounded-2xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] overflow-hidden bg-[#0b141a]">
      {/* Header */}
      <div className="flex items-center gap-2.5 bg-[#1f2c34] pl-3 pr-3.5 py-2.5">
        <svg className="w-2 h-3.5 shrink-0" viewBox="0 0 12 20" aria-hidden="true">
          <path d="M10 2 L3 10 L10 18" stroke="#aebac1" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </svg>
        {example.unknownAvatar ? (
          <div className="w-8 h-8 rounded-full shrink-0 bg-[#6a7175] relative overflow-hidden" aria-hidden="true">
            <span className="absolute top-[5px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#cfd6d9]" />
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-4 rounded-t-full bg-[#cfd6d9]" />
          </div>
        ) : (
          <div
            className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[#eafff8] text-base font-semibold"
            style={{ background: 'radial-gradient(120% 120% at 20% 15%, #7bd8c2 0%, #2ea88a 45%, #196f78 100%)' }}
            aria-hidden="true"
          >
            e
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[#e9edef] text-[13px] font-semibold leading-tight truncate">{example.contactName}</p>
          <p className="text-[#8696a0] text-[10px] leading-tight">{ui.online}</p>
        </div>
        <div className="flex items-center gap-3.5 shrink-0" aria-hidden="true">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="6" width="13" height="12" rx="2.5" stroke="#aebac1" strokeWidth="1.7" />
            <path d="M15 10.5 L21 7 v10 l-6 -3.5 z" fill="#aebac1" />
          </svg>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#aebac1">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.8 21 3 13.2 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .7-.2 1l-2.3 2.2z" />
          </svg>
        </div>
      </div>

      {/* Chat */}
      <div className="relative px-3 pt-3 pb-4 flex flex-col gap-2">
        {/* faint doodle texture, like the real WhatsApp wallpaper */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 30%, #ffffff 1.5px, transparent 1.5px), radial-gradient(circle at 75% 70%, #ffffff 1.2px, transparent 1.2px)',
            backgroundSize: '80px 80px, 60px 60px',
          }}
          aria-hidden="true"
        />
        <span className="relative self-center bg-[#182229] text-[#8696a0] text-[10px] px-2.5 py-1 rounded-lg shadow mb-1">
          {ui.today}
        </span>
        {example.messages.map((msg, i) =>
          msg.voice ? <VoiceBubble key={i} msg={msg} /> : <TextBubble key={i} msg={msg} />
        )}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 bg-[#1f2c34] px-3 py-2" aria-hidden="true">
        <span className="text-[#8696a0] text-lg font-light leading-none">+</span>
        <div className="flex-1 flex items-center justify-between bg-[#2a3942] rounded-full px-3 py-1.5 text-[#8696a0] text-xs">
          {ui.inputPlaceholder}
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#8696a0" strokeWidth="1.6" />
            <circle cx="9" cy="10" r="1.2" fill="#8696a0" />
            <circle cx="15" cy="10" r="1.2" fill="#8696a0" />
            <path d="M8 14.2c1 1.5 2.4 2.3 4 2.3s3-.8 4-2.3" stroke="#8696a0" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M9.2 4.6h5.6l1.5 2.1h3.2c1 0 1.9.8 1.9 1.9v9c0 1-.8 1.9-1.9 1.9H4.5c-1 0-1.9-.8-1.9-1.9v-9c0-1 .8-1.9 1.9-1.9h3.2l1.5-2.1z"
            stroke="#8696a0"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12.6" r="3.6" stroke="#8696a0" strokeWidth="1.6" />
        </svg>
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#8696a0">
          <path d="M12 15a3.5 3.5 0 0 0 3.5-3.5v-6a3.5 3.5 0 1 0-7 0v6A3.5 3.5 0 0 0 12 15z" />
          <path d="M18.5 11.5a6.5 6.5 0 0 1-13 0H4a8 8 0 0 0 7 7.9V22h2v-2.6a8 8 0 0 0 7-7.9h-1.5z" />
        </svg>
      </div>
    </div>

    <div className="text-center mt-5 px-2">
      <p className="font-bold text-stone-900">{example.title}</p>
      <p className="text-sm text-stone-500 font-medium mt-1">{example.caption}</p>
    </div>
  </div>
);

/**
 * Grid of example WhatsApp conversations. Horizontal snap-scroll on mobile,
 * 2×2 grid on md, 4-up row on lg. Section chrome (heading, CTA) lives in the
 * page that embeds this.
 */
export default function WhatsAppExamples({ className = '' }: { className?: string }) {
  const { whatsappSection } = useJournalingCopy();
  return (
    <div
      className={`flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0 ${className}`}
    >
      {whatsappSection.examples.map((example) => (
        <ChatCard key={example.key} example={example} ui={whatsappSection.chatUi} />
      ))}
    </div>
  );
}
