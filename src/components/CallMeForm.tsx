import React, { useState } from 'react';
import { PhoneCall, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import posthog from 'posthog-js';

export const REQUEST_CALL_URL = 'https://app.empathdash.com/api/phone/requestCall';
export const PHONE_MAIN = '+18883663082';
export const PHONE_DISPLAY = '+1 (888) 366-3082';

export type CallState = 'idle' | 'requesting' | 'ringing' | 'scheduled' | 'error';

export interface CallMeEvents {
  requested: string;
  placed: string;
  failed: string;
}

/** Local-time formatter for the scheduled-call confirmation. */
export function formatScheduledFor(when: Date): string {
  return when.toLocaleString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit',
  });
}

/** Format 10 raw digits as (480) 758-9755 while typing. */
export function formatAsYouType(digits: string): string {
  if (!digits) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/** Shared state machine behind every "Empath calls you" form on the site. */
export function useCallMeRequest(events: CallMeEvents, source: string) {
  const [digits, setDigits] = useState('');
  const [state, setState] = useState<CallState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [scheduledFor, setScheduledFor] = useState<Date | null>(null);

  const handleInput = (value: string) => {
    // Accept paste of +1 / 1-prefixed numbers; keep the last 10 national digits.
    let raw = value.replace(/\D/g, '');
    if (raw.length === 11 && raw.startsWith('1')) raw = raw.slice(1);
    setDigits(raw.slice(0, 10));
    if (state === 'error') setState('idle');
  };

  /**
   * scheduledAt = undefined → call right now. A Date → schedule for that
   * local instant; it's sent as absolute UTC plus the IANA timezone (for
   * analytics), so the server never does timezone math.
   */
  const requestCall = async (scheduledAt?: Date) => {
    if (digits.length !== 10 || state === 'requesting') return;
    setState('requesting');
    setErrorMessage('');
    posthog.capture(events.requested, scheduledAt ? { scheduled: true } : undefined);
    try {
      const res = await fetch(REQUEST_CALL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: `+1${digits}`,
          source,
          ...(scheduledAt ? {
            scheduledAt: scheduledAt.toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          } : {}),
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        if (body.scheduled && scheduledAt) {
          setScheduledFor(scheduledAt);
          setState('scheduled');
        } else {
          setState('ringing');
        }
        posthog.capture(events.placed, scheduledAt ? { scheduled: true } : undefined);
      } else {
        setState('error');
        setErrorMessage(body.error || "We couldn't place the call. Please try again in a moment.");
        posthog.capture(events.failed, { code: body.code || `http_${res.status}` });
      }
    } catch {
      setState('error');
      setErrorMessage(`Something went wrong. You can always dial ${PHONE_DISPLAY} directly.`);
      posthog.capture(events.failed, { code: 'network' });
    }
  };

  return { digits, state, errorMessage, scheduledFor, handleInput, requestCall };
}

/**
 * Compact inline "type your number, Empath calls you" form styled for the
 * homepage hero (neo-brutalist, matches the hero CTAs). The full-page
 * experience with FAQ etc. lives at /call-me (CallMePage).
 */
export default function CallMeForm({ eventPrefix, source }: { eventPrefix: string; source: string }) {
  const { digits, state, errorMessage, handleInput, requestCall } = useCallMeRequest(
    {
      requested: `${eventPrefix}_call_me_requested`,
      placed: `${eventPrefix}_call_me_placed`,
      failed: `${eventPrefix}_call_me_failed`,
    },
    source,
  );

  if (state === 'ringing') {
    return (
      <div className="bg-white rounded-xl border-2 border-[#1b8af1] p-4 text-center shadow-[4px_4px_0px_0px_#1b8af1]">
        <p className="font-bold text-stone-900 mb-1">📞 Calling you now — pick up!</p>
        <p className="text-sm text-stone-600 font-medium">
          Talk about your day, hang up, and it's saved as your first journal entry.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="tel"
          autoComplete="tel-national"
          inputMode="tel"
          aria-label="Your phone number (US)"
          placeholder="(555) 123-4567"
          value={formatAsYouType(digits)}
          onChange={(e) => handleInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') requestCall(); }}
          className="flex-1 min-w-0 text-base font-semibold bg-white border-2 border-stone-900 rounded-xl px-4 py-3 focus:border-[#1b8af1] focus:outline-none placeholder:text-stone-400"
        />
        <button
          onClick={() => requestCall()}
          disabled={digits.length !== 10 || state === 'requesting'}
          className="px-5 py-3 bg-[#1b8af1] text-white rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] disabled:bg-stone-300 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:cursor-not-allowed transition-all duration-200 font-bold flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {state === 'requesting'
            ? (<><Loader2 className="w-4 h-4 animate-spin" /> Dialing…</>)
            : (<><PhoneCall className="w-4 h-4" /> Call me now</>)}
        </button>
      </div>
      {state === 'error' && (
        <p className="text-sm text-red-600 font-medium mt-2 text-left" role="alert">{errorMessage}</p>
      )}
      <p className="text-xs text-stone-400 font-medium mt-2">
        US numbers only. One automated call, standard rates.{' '}
        <Link to="/call-me" className="text-[#1b8af1] hover:underline font-semibold">Schedule for later or learn more →</Link>
      </p>
    </div>
  );
}
