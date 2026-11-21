import React, { useState } from 'react';
import posthog from 'posthog-js';
import { Check, Mail } from 'lucide-react';

// Advisory program application, inline on /advisory. Posts to the same
// empath-heroku endpoint as the /therapist demo form
// (routes/demoRequest/demoRequest.js), which emails the request to Div. That
// endpoint has no advisory-specific fields, so years in practice, client
// count, and motivation are folded into `message`, and `source` marks the
// email as an advisory application.
const APPLICATION_ENDPOINT = 'https://app.empathdash.com/api/demo-request';
const APPLICATION_SOURCE = 'advisory_application';

// The endpoint caps `message` at 1500 characters; this leaves room for the
// experience and client-count lines that are prepended to it.
const MOTIVATION_MAX = 1200;

type ApplicationState = 'idle' | 'sending' | 'sent' | 'error';

const SEND_FAILED = "We couldn't send your application. Please email div@myempath.co instead.";

export default function AdvisoryApplicationForm() {
  const [state, setState] = useState<ApplicationState>('idle');
  const [errorText, setErrorText] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    practice: '',
    experience: '',
    clients: '',
    motivation: '',
    website: '',
  });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'sending') return;

    if (!form.name.trim() || !form.email.trim() || !form.practice.trim() || !form.experience || !form.clients.trim()) {
      setErrorText('Please fill in your name, email, practice, years in practice, and number of clients.');
      setState('error');
      return;
    }

    setState('sending');
    setErrorText(null);
    posthog.capture('advisory_application_submitted', { has_motivation: !!form.motivation.trim() });

    const message = [
      'Advisory program application.',
      `Years in practice: ${form.experience}.`,
      `Active clients: ${form.clients.trim()}.`,
      form.motivation.trim() ? `Why they want to join: ${form.motivation.trim()}` : '',
    ]
      .filter(Boolean)
      .join(' ');

    try {
      const res = await fetch(APPLICATION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          practice: form.practice,
          message,
          website: form.website,
          source: APPLICATION_SOURCE,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || SEND_FAILED);
      }
      posthog.capture('advisory_application_sent');
      setState('sent');
    } catch (err) {
      posthog.capture('advisory_application_failed', { message: err instanceof Error ? err.message : String(err) });
      setErrorText(err instanceof Error ? err.message : SEND_FAILED);
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="text-center py-6">
        <div className="mx-auto w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <Check className="w-7 h-7 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-stone-900 mb-2">Application received</h3>
        <p className="text-stone-600 max-w-md mx-auto">
          Thanks, {form.name.trim() || 'there'}. Div will reply to {form.email.trim()} about next steps.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#1b8af1]';
  const labelClass = 'block text-sm font-semibold text-stone-700 mb-1.5';
  const required = <span aria-hidden="true" className="text-rose-500">*</span>;

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 text-left" noValidate>
      <label className="block">
        <span className={labelClass}>Name {required}</span>
        <input className={inputClass} name="name" autoComplete="name" required value={form.name} onChange={update('name')} />
      </label>
      <label className="block">
        <span className={labelClass}>Email {required}</span>
        <input className={inputClass} type="email" name="email" autoComplete="email" required value={form.email} onChange={update('email')} />
      </label>
      <label className="block md:col-span-2">
        <span className={labelClass}>Practice name and location {required}</span>
        <input className={inputClass} name="practice" autoComplete="organization" required value={form.practice} onChange={update('practice')} />
      </label>
      <label className="block">
        <span className={labelClass}>Years in practice {required}</span>
        <select className={inputClass} name="experience" required value={form.experience} onChange={update('experience')}>
          <option value="">Select</option>
          <option value="0-2">0-2 years</option>
          <option value="3-5">3-5 years</option>
          <option value="6-10">6-10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </label>
      <label className="block">
        <span className={labelClass}>Active clients {required}</span>
        <input className={inputClass} type="number" min={1} inputMode="numeric" name="clients" required value={form.clients} onChange={update('clients')} />
      </label>
      <label className="block md:col-span-2">
        <span className={labelClass}>Why do you want to join? <span className="text-stone-400">(optional)</span></span>
        <textarea
          className={`${inputClass} min-h-[104px]`}
          name="motivation"
          maxLength={MOTIVATION_MAX}
          value={form.motivation}
          onChange={update('motivation')}
        />
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
      <div className="md:col-span-2 mt-1">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white hover:bg-[#1b8af1] transition-colors disabled:opacity-60 disabled:cursor-wait cursor-pointer font-semibold"
        >
          <Mail className="w-5 h-5" aria-hidden="true" />
          {state === 'sending' ? 'Sending…' : 'Send application'}
        </button>
      </div>
    </form>
  );
}
