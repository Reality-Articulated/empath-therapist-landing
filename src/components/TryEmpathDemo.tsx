// Interactive "try Empath right here" demo: an Empath-styled chat card the
// visitor drives with hardcoded option buttons (no free-text input). Tapping
// an option plays their message into the chat, shows a typing indicator,
// then Empath's canned reply. Two turns per branch (opener → follow-up),
// then the CTA sends the visitor to the App Store.
//
// The chat chrome deliberately matches the site's Empath brand (light card,
// stone borders, #1b8af1 accents, hard shadows), NOT WhatsApp — the WhatsApp
// look belongs to the examples section below this one. Every string lives in
// the i18n catalog (`tryIt`); nothing tapped here leaves the page.
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import posthog from 'posthog-js';
import { Brain, Lock, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';
import logo from '../../public/empath-logo.png';
import { useJournalingCopy } from '../i18n/copy';
import { JournalingCopy } from '../i18n/copy/journaling.en';

const APP_STORE_URL = 'https://apps.apple.com/us/app/empath-ai-diary-for-your-mind/id6472873287';

type Branch = JournalingCopy['tryIt']['branches'][number];
type FollowUp = Branch['followUps'][number];
type Stage = 'start' | 'followup' | 'done';
type Msg = { from: 'user' | 'empath'; text: string };

const TYPING_MS = 1300;

const bubbleIn = {
  initial: { opacity: 0, y: 12, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.25, ease: 'easeOut' as const },
};

const EmpathBubble = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-end gap-2 max-w-[85%] self-start">
    <div className="w-7 h-7 bg-[#1b8af1] rounded-full flex items-center justify-center shrink-0 border-2 border-stone-900">
      <Brain className="w-3.5 h-3.5 text-white" />
    </div>
    <div className="bg-white border-2 border-stone-200 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-stone-700 font-medium leading-relaxed">
      {children}
    </div>
  </div>
);

const UserBubble = ({ text }: { text: string }) => (
  <div className="self-end max-w-[85%] bg-[#1b8af1] text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm font-medium leading-relaxed border-2 border-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
    {text}
  </div>
);

const TypingDots = () => (
  <span className="flex items-center gap-1 py-1" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce"
        style={{ animationDelay: `${i * 160}ms`, animationDuration: '0.9s' }}
      />
    ))}
  </span>
);

export default function TryEmpathDemo({ className = '' }: { className?: string }) {
  const { tryIt, whatsappSection } = useJournalingCopy();
  const ui = whatsappSection.chatUi;

  const [messages, setMessages] = useState<Msg[]>([{ from: 'empath', text: tryIt.greeting }]);
  const [typing, setTyping] = useState(false);
  const [branch, setBranch] = useState<Branch | null>(null);
  const [stage, setStage] = useState<Stage>('start');
  const timerRef = useRef<number>();
  const chatRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [strip, setStrip] = useState({ atStart: true, atEnd: true });

  // Funnel top: fires once when the demo card is meaningfully on screen, so
  // option-click and completion rates have a denominator.
  const { ref: viewRef } = useInView({
    threshold: 0.3,
    triggerOnce: true,
    onChange: (inView) => inView && posthog.capture('tryit_demo_viewed'),
  });

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  // The option strip is a carousel only when it actually overflows (six
  // openers do, two follow-ups usually don't) — measured, not assumed. Each
  // arrow/fade shows only when its side has hidden chips, so the first chip
  // is never covered at the start position.
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const measure = () => {
      const overflows = el.scrollWidth > el.clientWidth + 4;
      setStrip({
        atStart: !overflows || el.scrollLeft <= 4,
        atEnd: !overflows || el.scrollLeft >= el.scrollWidth - el.clientWidth - 4,
      });
    };
    el.scrollTo({ left: 0 });
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [stage, branch]);

  const scrollStrip = (dir: 1 | -1) =>
    stripRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' });

  // Keep the newest bubble in view as the column grows past the fixed height.
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const playExchange = (userText: string, reply: string, after: () => void) => {
    setMessages((prev) => [...prev, { from: 'user', text: userText }]);
    setTyping(true);
    timerRef.current = window.setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { from: 'empath', text: reply }]);
      after();
    }, TYPING_MS);
  };

  const pickBranch = (b: Branch) => {
    posthog.capture('tryit_demo_option_clicked', { opener: b.key, step: 'opener' });
    setBranch(b);
    playExchange(b.userText, b.reply, () => setStage('followup'));
  };

  const pickFollowUp = (f: FollowUp) => {
    if (!branch) return;
    posthog.capture('tryit_demo_option_clicked', { opener: branch.key, step: 'followup', followup: f.key });
    playExchange(f.userText, f.reply, () => {
      setStage('done');
      posthog.capture('tryit_demo_completed', { opener: branch.key, followup: f.key });
    });
  };

  const restart = () => {
    posthog.capture('tryit_demo_restarted', { opener: branch?.key });
    window.clearTimeout(timerRef.current);
    setMessages([{ from: 'empath', text: tryIt.greeting }]);
    setTyping(false);
    setBranch(null);
    setStage('start');
  };

  const ctaOpener = (branch ?? tryIt.branches[0]).key;

  const optionButton = (label: string, onClick: () => void, key: string) => (
    <button
      key={key}
      type="button"
      onClick={onClick}
      disabled={typing}
      className="shrink-0 snap-start whitespace-nowrap px-4 py-2.5 bg-white rounded-full border-2 border-stone-900 text-sm font-bold text-stone-900 shadow-[3px_3px_0px_0px_#1b8af1] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1b8af1] transition-all disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_#1b8af1]"
    >
      {label}
    </button>
  );

  return (
    <div ref={viewRef} className={`flex flex-col items-center ${className}`}>
      <div className="w-full max-w-md bg-white rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b-2 border-stone-200">
          <img src={logo} alt="" className="w-9 h-9 object-contain" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-stone-900 text-sm leading-tight">Empath</p>
            <p className="text-xs text-stone-500 font-medium leading-tight flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${typing ? 'bg-[#1b8af1] animate-pulse' : 'bg-green-500'}`} />
              {typing ? ui.typing : ui.online}
            </p>
          </div>
          <Lock className="w-4 h-4 text-stone-300 shrink-0" aria-hidden="true" />
        </div>

        {/* Messages */}
        <div
          ref={chatRef}
          aria-live="polite"
          className="h-[380px] overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-3 bg-[#FAF9F6] [scrollbar-width:none]"
        >
          {messages.map((msg, i) => (
            <motion.div key={i} {...bubbleIn} className="flex flex-col shrink-0">
              {msg.from === 'empath' ? <EmpathBubble>{msg.text}</EmpathBubble> : <UserBubble text={msg.text} />}
            </motion.div>
          ))}
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col shrink-0"
            >
              <EmpathBubble>
                <TypingDots />
              </EmpathBubble>
            </motion.div>
          )}
        </div>

        {/* Quick replies: the only way to "type" in this demo. Rendered as a
            snap carousel — arrows and edge fades appear only when the strip
            actually overflows (six openers do; two follow-ups don't). */}
        <div className="border-t-2 border-stone-200 py-3 min-h-[96px] flex flex-col justify-center">
          {stage !== 'done' ? (
            <>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-2 text-center px-4">
                {stage === 'start' ? tryIt.pickPrompt : tryIt.followUpPrompt}
              </p>
              <div className="relative">
                {/* Arrows are a mouse affordance only — keyboard/SR users tab
                    through the chips directly, which scrolls them into view. */}
                {!strip.atStart && (
                  <>
                    <div className="absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" aria-hidden="true" />
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-hidden="true"
                      onClick={() => scrollStrip(-1)}
                      className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white border-2 border-stone-900 rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] hover:bg-stone-100 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-stone-900" />
                    </button>
                  </>
                )}
                {!strip.atEnd && (
                  <>
                    <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" aria-hidden="true" />
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-hidden="true"
                      onClick={() => scrollStrip(1)}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white border-2 border-stone-900 rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] hover:bg-stone-100 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-stone-900" />
                    </button>
                  </>
                )}
                {/* scroll-px matches the inner px so chip snap positions start
                    at scrollLeft 0 (otherwise snapping rests at 20px and the
                    "at start" check never passes). */}
                <div ref={stripRef} className="overflow-x-auto snap-x scroll-px-5 [scrollbar-width:none]">
                  {/* w-max + mx-auto: centers when the chips fit, scrolls when
                      they don't. Padding lives here so the last chip isn't
                      clipped by the scroll container. */}
                  <div className="flex gap-2 w-max mx-auto py-1 px-5">
                    {(stage === 'start' ? tryIt.branches : branch?.followUps ?? []).map((o) =>
                      optionButton(
                        o.option,
                        () => (stage === 'start' ? pickBranch(o as Branch) : pickFollowUp(o as FollowUp)),
                        o.key
                      )
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={restart}
              className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors mx-auto"
            >
              {tryIt.restart}
            </button>
          )}
        </div>

        {/* Disabled input mock: signals "the real thing types free-form" */}
        <div className="flex items-center gap-2 px-4 pb-4">
          <div className="flex-1 bg-stone-100 rounded-full px-4 py-2.5 text-sm text-stone-400 font-medium select-none">
            {ui.inputPlaceholder}
          </div>
          <div className="w-9 h-9 bg-[#1b8af1] rounded-full flex items-center justify-center border-2 border-stone-900 opacity-60" aria-hidden="true">
            <ArrowUp className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Post-demo CTA: the demo's endpoint is the App Store */}
      {stage === 'done' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center mt-8"
        >
          <p className="text-stone-700 font-bold text-center mb-4">{tryIt.ctaLead}</p>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture('tryit_app_store_clicked', { opener: ctaOpener })}
            className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-xl font-bold text-base border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1b8af1] hover:shadow-[4px_4px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
            {tryIt.cta}
          </a>
          <p className="text-xs text-stone-400 font-medium mt-3 text-center">{tryIt.ctaNote}</p>
        </motion.div>
      )}
    </div>
  );
}
