// Create + launch the landing-hero copy experiment v3 in PostHog, and stop v2.
//
// v2 (flag `landing-hero-copy-2`) decided: `chatgpt-context` beat `control`.
// The page (src/pages/JournalingPage.tsx) now reads flag `landing-hero-copy-3`:
// the winning chatgpt-context copy is carried forward as v3's `control` arm,
// tested against 15 new challenger phrases (src/i18n/copy/journaling.en.ts,
// `heroExperimentV3`). English-only — non-English visitors always render the
// default `hero` regardless of bucket, so v3 exposure data for those locales
// is not meaningfully differentiated between arms.
//
// 16 arms at even rollout (100/16 = 6.25% each) means this will take
// considerably longer to reach significance than v2's 2-arm test — expect a
// multi-week-to-multi-month readout, not v2's ~2-week cadence.
//
// Usage:
//   POSTHOG_PERSONAL_API_KEY=phx_... node scripts/create-hero-experiment-v3.mjs
//
// Idempotent-ish: if the v3 flag or experiment already exists, it reports and
// exits instead of duplicating; stopping v2 skips if already ended.

const API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const HOST = process.env.POSTHOG_API_HOST || 'https://us.posthog.com';
const FLAG_KEY = 'landing-hero-copy-3';
const V2_EXPERIMENT_ID = 409686;
if (!API_KEY) {
  console.error('Set POSTHOG_PERSONAL_API_KEY (phx_...) — personal key with experiment+feature-flag write scopes.');
  process.exit(1);
}

// Keep in sync with src/i18n/copy/journaling.en.ts `heroExperimentV3` keys.
const CHALLENGER_KEYS = [
  'no-one-to-talk-to',
  'overthinking',
  'too-much',
  'doomscrolling',
  'high-functioning',
  'bottling-up',
  'faking-it',
  'no-one-gets-it',
  'googling-feelings',
  'ai-is-normal-now',
  'ai-forgets-you',
  'ai-knows-you',
  'chatgpt-therapist',
  'ai-chats-disappear',
  'venting-chatbot',
];
const VARIANT_KEYS = ['control', ...CHALLENGER_KEYS];

async function api(path, body, method = body ? 'POST' : 'GET') {
  const res = await fetch(`${HOST}${path}`, {
    method,
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

// 1. Stop v2 ("chatgpt-context" vs "won't quit") — the page no longer reads
// its flag, so leaving it running only muddies the flags UI.
try {
  const v2 = await api(`/api/projects/@current/experiments/${V2_EXPERIMENT_ID}/`);
  if (v2.end_date) {
    console.log(`v2 experiment ${V2_EXPERIMENT_ID} already ended ${v2.end_date} — skipping.`);
  } else {
    await api(`/api/projects/@current/experiments/${V2_EXPERIMENT_ID}/`, { end_date: new Date().toISOString() }, 'PATCH');
    console.log(`Stopped v2 experiment ${V2_EXPERIMENT_ID} (flag landing-hero-copy-2). Winner: chatgpt-context.`);
  }
} catch (err) {
  console.warn(`Could not stop v2 experiment ${V2_EXPERIMENT_ID}: ${err.message}`);
}

// 2. Bail out early if something with the v3 flag key already exists.
const existingFlags = await api(`/api/projects/@current/feature_flags/?search=${FLAG_KEY}`);
const flagHit = (existingFlags.results || []).find((f) => f.key === FLAG_KEY);
if (flagHit) {
  console.log(`Flag "${FLAG_KEY}" already exists (id ${flagHit.id}, active=${flagHit.active}) — nothing created.`);
  console.log('If the experiment is missing or unlaunched, finish it in the UI: Experiments → landing hero copy v3.');
  process.exit(0);
}

// Even split across all 16 arms. PostHog requires an integer
// rollout_percentage, and 100/16 = 6.25 isn't one, so distribute the
// remainder across the first few variants (6% × 12 + 7% × 4 = 100).
const base = Math.floor(100 / VARIANT_KEYS.length);
const remainder = 100 - base * VARIANT_KEYS.length;
const variants = VARIANT_KEYS.map((key, i) => ({
  key,
  rollout_percentage: base + (i < remainder ? 1 : 0),
}));

const experiment = await api('/api/projects/@current/experiments/', {
  name: 'Landing hero copy v3: chatgpt-context anchor vs 15 challengers',
  description:
    'H1 + subheadline only, JournalingPage (/ and /app), ENGLISH ONLY (translation intentionally skipped — ' +
    'non-English visitors always render the default hero regardless of assigned variant). ' +
    'Control = "Tired of re-explaining yourself to ChatGPT?" (the v2 winner, carried forward as the v3 anchor). ' +
    '15 challengers target specific emotional insecurities that double as high-intent search phrases ' +
    '(loneliness, overthinking, shame/burden, masking, imposter syndrome, AI-amnesia frustration, the ' +
    '"using ChatGPT as a therapist" trend, etc.) — see heroExperimentV3 in journaling.en.ts for full copy. ' +
    'Success = channel CTA + App Store clicks. ' +
    'NOTE: 16-arm test at ~6.25% traffic per arm — expect a multi-week-to-multi-month readout, not a 2-week one.',
  feature_flag_key: FLAG_KEY,
  parameters: {
    feature_flag_variants: variants,
  },
  filters: {},
});
console.log(`Created experiment ${experiment.id}: ${experiment.name}`);
console.log(`Variants: ${variants.map((v) => `${v.key}:${v.rollout_percentage}%`).join(', ')}`);

// 3. Attach the same goal metrics v1/v2 used (shape confirmed working there).
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
console.log('Launched — flag is now serving all 16 arms.');

const flags = await api(`/api/projects/@current/feature_flags/?search=${FLAG_KEY}`);
const flag = (flags.results || []).find((f) => f.key === FLAG_KEY);
console.log(
  `Flag "${FLAG_KEY}": active=${flag?.active}, variants=${JSON.stringify(
    flag?.filters?.multivariate?.variants?.map((v) => `${v.key}:${v.rollout_percentage}`),
  )}`,
);
