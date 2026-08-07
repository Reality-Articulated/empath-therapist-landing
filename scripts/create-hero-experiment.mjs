// Create + launch the landing-hero copy experiment in PostHog.
//
// The page (src/pages/JournalingPage.tsx) reads flag `landing-hero-copy`:
// variant `never-open` renders "The app you never have to open." — anything
// else renders the control "The journal you won't quit" hero. This script
// creates the experiment (which mints the multivariate flag with a 50/50
// control / never-open split) and launches it immediately, so the flag
// starts serving. Goal metrics can be attached in the UI at any time —
// every CTA click event already carries the active flag.
//
// Usage:
//   POSTHOG_PERSONAL_API_KEY=phx_... node scripts/create-hero-experiment.mjs
//
// Idempotent-ish: if the flag or experiment already exists, it reports and
// exits instead of duplicating.

const API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const HOST = process.env.POSTHOG_API_HOST || 'https://us.posthog.com';
const FLAG_KEY = 'landing-hero-copy';
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

// Bail out early if something with this flag key already exists.
const existingFlags = await api(`/api/projects/@current/feature_flags/?search=${FLAG_KEY}`);
const flagHit = (existingFlags.results || []).find((f) => f.key === FLAG_KEY);
if (flagHit) {
  console.log(`Flag "${FLAG_KEY}" already exists (id ${flagHit.id}, active=${flagHit.active}) — nothing created.`);
  console.log('If the experiment is missing or unlaunched, finish it in the UI: Experiments → landing hero copy.');
  process.exit(0);
}

const experiment = await api('/api/projects/@current/experiments/', {
  name: 'Landing hero copy: "never have to open" vs "won\'t quit"',
  description:
    'H1 + subheadline only, JournalingPage (/ and /app, all locales). ' +
    'Control = "The journal you won\'t quit" (also what prerender/bots see); ' +
    'test = "The app you never have to open". Success = channel CTA + App Store clicks.',
  feature_flag_key: FLAG_KEY,
  parameters: {
    feature_flag_variants: [
      { key: 'control', rollout_percentage: 50 },
      { key: 'never-open', rollout_percentage: 50 },
    ],
  },
  filters: {},
});
console.log(`Created experiment ${experiment.id}: ${experiment.name}`);

// Launch: setting start_date activates the linked flag so it starts serving.
await api(`/api/projects/@current/experiments/${experiment.id}/`, { start_date: new Date().toISOString() }, 'PATCH');
console.log('Launched — flag is now serving 50/50.');

const flags = await api(`/api/projects/@current/feature_flags/?search=${FLAG_KEY}`);
const flag = (flags.results || []).find((f) => f.key === FLAG_KEY);
console.log(`Flag "${FLAG_KEY}": active=${flag?.active}, variants=${JSON.stringify(flag?.filters?.multivariate?.variants?.map((v) => `${v.key}:${v.rollout_percentage}`))}`);
console.log(`\nNext (optional, anytime): attach goal metrics in the UI — journaling_page_app_store_clicked (primary), channel_link_clicked / journaling_page_call_clicked (secondary).`);
