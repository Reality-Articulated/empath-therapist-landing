// Create + launch the landing-hero copy experiment v2 in PostHog, and stop v1.
//
// The page (src/pages/JournalingPage.tsx) reads flag `landing-hero-copy-2`:
// variant `chatgpt-context` renders "Tired of re-explaining yourself to
// ChatGPT?" — anything else renders the control "The journal you won't quit"
// hero. This script (1) stops the retired v1 experiment (406743, flag
// `landing-hero-copy` / variant `never-open`, launched 2026-08-07), then
// (2) creates the v2 experiment (which mints the multivariate flag with a
// 50/50 control / chatgpt-context split), launches it, and attaches the same
// goal metrics v1 used — every CTA click event already carries active flags.
//
// Usage:
//   POSTHOG_PERSONAL_API_KEY=phx_... node scripts/create-hero-experiment.mjs
//
// Idempotent-ish: if the v2 flag or experiment already exists, it reports and
// exits instead of duplicating; stopping v1 skips if already ended.

const API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const HOST = process.env.POSTHOG_API_HOST || 'https://us.posthog.com';
const FLAG_KEY = 'landing-hero-copy-2';
const VARIANT_KEY = 'chatgpt-context';
const V1_EXPERIMENT_ID = 406743;
if (!API_KEY) {
  console.error('Set POSTHOG_PERSONAL_API_KEY (phx_...) — personal key with experiment+feature-flag write scopes.');
  process.exit(1);
}

async function api(path, body, method = body ? 'POST' : 'GET') {
  const res = await fetch(`${HOST}${path}`, {
    method,
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

// 1. Stop v1 ("never have to open" vs "won't quit") — the page no longer
// reads its flag, so leaving it running only muddies the flags UI.
try {
  const v1 = await api(`/api/projects/@current/experiments/${V1_EXPERIMENT_ID}/`);
  if (v1.end_date) {
    console.log(`v1 experiment ${V1_EXPERIMENT_ID} already ended ${v1.end_date} — skipping.`);
  } else {
    await api(`/api/projects/@current/experiments/${V1_EXPERIMENT_ID}/`, { end_date: new Date().toISOString() }, 'PATCH');
    console.log(`Stopped v1 experiment ${V1_EXPERIMENT_ID} (flag landing-hero-copy).`);
  }
} catch (err) {
  console.warn(`Could not stop v1 experiment ${V1_EXPERIMENT_ID}: ${err.message}`);
}

// 2. Bail out early if something with the v2 flag key already exists.
const existingFlags = await api(`/api/projects/@current/feature_flags/?search=${FLAG_KEY}`);
const flagHit = (existingFlags.results || []).find((f) => f.key === FLAG_KEY);
if (flagHit) {
  console.log(`Flag "${FLAG_KEY}" already exists (id ${flagHit.id}, active=${flagHit.active}) — nothing created.`);
  console.log('If the experiment is missing or unlaunched, finish it in the UI: Experiments → landing hero copy v2.');
  process.exit(0);
}

const experiment = await api('/api/projects/@current/experiments/', {
  name: 'Landing hero copy v2: "tired of re-explaining to ChatGPT" vs "won\'t quit"',
  description:
    'H1 + subheadline only, JournalingPage (/ and /app, all locales). ' +
    'Control = "The journal you won\'t quit" (also what prerender/bots see); ' +
    'test = "Tired of re-explaining yourself to ChatGPT?" (memory + lives-in-your-chats positioning). ' +
    'Success = channel CTA + App Store clicks.',
  feature_flag_key: FLAG_KEY,
  parameters: {
    feature_flag_variants: [
      { key: 'control', rollout_percentage: 50 },
      { key: VARIANT_KEY, rollout_percentage: 50 },
    ],
  },
  filters: {},
});
console.log(`Created experiment ${experiment.id}: ${experiment.name}`);

// 3. Attach the same goal metrics v1 used (shape confirmed working on v1).
const meanMetric = (event) => ({
  kind: 'ExperimentMetric',
  metric_type: 'mean',
  source: { kind: 'EventsNode', event },
});
await api(
  `/api/projects/@current/experiments/${experiment.id}/`,
  {
    metrics: [meanMetric('journaling_page_app_store_clicked')],
    metrics_secondary: [meanMetric('channel_link_clicked'), meanMetric('journaling_page_call_clicked')],
  },
  'PATCH',
);
console.log('Attached goal metrics: app_store_clicked (primary); channel_link_clicked, call_clicked (secondary).');

// 4. Launch: setting start_date activates the linked flag so it starts serving.
await api(`/api/projects/@current/experiments/${experiment.id}/`, { start_date: new Date().toISOString() }, 'PATCH');
console.log('Launched — flag is now serving 50/50.');

const flags = await api(`/api/projects/@current/feature_flags/?search=${FLAG_KEY}`);
const flag = (flags.results || []).find((f) => f.key === FLAG_KEY);
console.log(`Flag "${FLAG_KEY}": active=${flag?.active}, variants=${JSON.stringify(flag?.filters?.multivariate?.variants?.map((v) => `${v.key}:${v.rollout_percentage}`))}`);
