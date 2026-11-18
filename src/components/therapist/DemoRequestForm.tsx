import React, { useState } from 'react';
import posthog from 'posthog-js';
import { Check, Mail, MessageSquare } from 'lucide-react';

// "Get a demo" request form, shared by /therapist and the therapist blog.
// Google Calendar appointment schedules need a paid Workspace plan, so the
// form posts to empath-heroku, which emails the request to Div
// (routes/demoRequest/demoRequest.js) for a manual follow-up.
const DEMO_REQUEST_ENDPOINT = 'https://app.empathdash.com/api/demo-request';
export const DEMO_CHAT_PREFILL = "Hi! I'd like to book a 15-minute Empath demo. A few times that work for me: ";

type DemoFormState = 'idle' | 'sending' | 'sent' | 'error';

export default function DemoRequestForm({
  onChat,
  source,
}: {
  onChat: () => void;
  /** Where the request came from; shown in the email Div receives. */
  source: string;
}) {
  const [state, setState] = useState<DemoFormState>('idle');
  const [errorText, setErrorText] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', practice: '', times: '', message: '', website: '' });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setErrorText(null);
    posthog.capture('therapist_demo_requested', { has_times: !!form.times.trim(), has_practice: !!form.practice.trim() });
    try {
      const res = await fetch(DEMO_REQUEST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "We couldn't send your request. Please try the chat instead.");
      }
      posthog.capture('therapist_demo_sent');
      setState('sent');
    } catch (err) {
      posthog.capture('therapist_demo_failed', { message: err instanceof Error ? err.message : String(err) });
      setErrorText(err instanceof Error ? err.message : "We couldn't send your request. Please try the chat instead.");
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="text-center py-6">
        <div className="mx-auto w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <Check className="w-7 h-7 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-stone-900 mb-2">Request received</h3>
        <p className="text-stone-600 max-w-md mx-auto">
          Thanks, {form.name.trim() || 'there'}. Div will email you at {form.email.trim()} within a day to confirm a time.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#1b8af1]';
  const labelClass = 'block text-sm font-semibold text-stone-700 mb-1.5';

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-4" noValidate>
      <p className="md:col-span-2 text-stone-600 leading-relaxed">
        Fifteen minutes with Div, Empath's founder: a walk through the client experience and your dashboard, then your questions.
        Leave your details and a few times that work, and you'll hear back within a day.
      </p>
      <label className="block">
        <span className={labelClass}>Name <span aria-hidden="true" className="text-rose-500">*</span></span>
        <input className={inputClass} name="name" autoComplete="name" required value={form.name} onChange={update('name')} />
      </label>
      <label className="block">
        <span className={labelClass}>Email <span aria-hidden="true" className="text-rose-500">*</span></span>
        <input className={inputClass} type="email" name="email" autoComplete="email" required value={form.email} onChange={update('email')} />
      </label>
      <label className="block">
        <span className={labelClass}>Practice <span className="text-stone-400">(optional)</span></span>
        <input className={inputClass} name="practice" autoComplete="organization" value={form.practice} onChange={update('practice')} />
      </label>
      <label className="block">
        <span className={labelClass}>Times that work <span className="text-stone-400">(with time zone)</span></span>
        <input className={inputClass} name="times" placeholder="e.g. Tue or Thu after 2pm ET" value={form.times} onChange={update('times')} />
      </label>
      <label className="block md:col-span-2">
        <span className={labelClass}>Anything you want covered <span className="text-stone-400">(optional)</span></span>
        <textarea className={`${inputClass} min-h-[88px]`} name="message" value={form.message} onChange={update('message')} />
      </label>
      {/* Honeypot: hidden from people, filled by bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
        </label>
      </div>
      {state === 'error' && errorText && (
        <p role="alert" className="md:col-span-2 text-sm text-rose-600">{errorText}</p>
      )}
      <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 sm:items-center mt-1">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white hover:bg-[#1b8af1] transition-colors disabled:opacity-60 disabled:cursor-wait cursor-pointer font-semibold"
        >
          <Mail className="w-5 h-5" aria-hidden="true" />
          {state === 'sending' ? 'Sending…' : 'Request my demo'}
        </button>
        <button
          type="button"
          onClick={onChat}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-stone-300 text-stone-900 hover:border-stone-900 transition-colors cursor-pointer font-semibold"
        >
          <MessageSquare className="w-5 h-5 text-[#1b8af1]" aria-hidden="true" />
          Chat with us instead
        </button>
      </div>
    </form>
  );
}
