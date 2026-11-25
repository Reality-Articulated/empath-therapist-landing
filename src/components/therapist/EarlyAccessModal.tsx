import { useEffect } from 'react';
import posthog from 'posthog-js';
import { MessageSquare, Mail, CalendarDays, Linkedin, ChevronRight, X } from 'lucide-react';
import { openSupportChat } from '../../utils/supportChat';
import { THERAPIST_BOOKING_URL } from '../../utils/therapistBooking';

const CONTACT_EMAIL = 'div@myempath.co';
const EMAIL_SUBJECT = 'Early access to Empath for my practice';
const CHAT_PREFILL = "Hi Div, I'd like early access to Empath for my practice. ";

// Div's personal LinkedIn profile. The LinkedIn option is only shown once
// this is set.
const LINKEDIN_URL = '';

const ROW =
  'w-full flex items-center gap-4 rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-left hover:border-stone-900 transition-colors cursor-pointer';
const ROW_ICON = 'w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0';
const ROW_TITLE = 'block font-semibold text-stone-900';
const ROW_DESC = 'block text-sm text-stone-600';

/**
 * Opened by every "Get early access" button on the therapist pages. Booking a
 * call is not always possible, so it offers each way to reach Div: live chat
 * (Crisp), email, a calendar booking, and LinkedIn.
 */
export default function EarlyAccessModal({
  open,
  onClose,
  location,
}: {
  open: boolean;
  onClose: () => void;
  /** Which button opened the modal; sent with the analytics events. */
  location: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const trackOption = (option: 'chat' | 'email' | 'calendar' | 'linkedin') =>
    posthog.capture('therapist_early_access_option_clicked', { option, location });

  return (
    <div
      className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="early-access-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF9F6] rounded-3xl border border-stone-200 shadow-lift p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start gap-4 mb-6">
          <div>
            <h2 id="early-access-modal-title" className="text-2xl font-medium text-stone-900 font-serif">
              Get early access
            </h2>
            <p className="text-stone-600 mt-1">Reach Div, Empath's founder, whichever way suits you.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-900 rounded-full p-2 -mr-2 -mt-2 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              trackOption('chat');
              onClose();
              openSupportChat(CHAT_PREFILL);
            }}
            className={ROW}
          >
            <span className={ROW_ICON}>
              <MessageSquare className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className={ROW_TITLE}>Chat with Div</span>
              <span className={ROW_DESC}>Send a message right here on the site.</span>
            </span>
            <ChevronRight className="w-4 h-4 text-stone-400 flex-shrink-0" aria-hidden="true" />
          </button>

          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`}
            onClick={() => trackOption('email')}
            className={ROW}
          >
            <span className={ROW_ICON}>
              <Mail className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className={ROW_TITLE}>Email</span>
              <span className={ROW_DESC}>{CONTACT_EMAIL}</span>
            </span>
            <ChevronRight className="w-4 h-4 text-stone-400 flex-shrink-0" aria-hidden="true" />
          </a>

          <a
            href={THERAPIST_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOption('calendar')}
            className={ROW}
          >
            <span className={ROW_ICON}>
              <CalendarDays className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className={ROW_TITLE}>Book a call</span>
              <span className={ROW_DESC}>Pick a time on Div's calendar.</span>
            </span>
            <ChevronRight className="w-4 h-4 text-stone-400 flex-shrink-0" aria-hidden="true" />
          </a>

          {LINKEDIN_URL && (
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOption('linkedin')}
              className={ROW}
            >
              <span className={ROW_ICON}>
                <Linkedin className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className={ROW_TITLE}>LinkedIn</span>
                <span className={ROW_DESC}>Message Div on LinkedIn.</span>
              </span>
              <ChevronRight className="w-4 h-4 text-stone-400 flex-shrink-0" aria-hidden="true" />
            </a>
          )}
        </div>

        <p className="text-sm text-stone-500 mt-6 text-center">2 client seats free forever. No card.</p>
      </div>
    </div>
  );
}
