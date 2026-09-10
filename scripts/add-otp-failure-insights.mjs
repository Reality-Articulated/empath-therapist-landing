// Adds two OTP-failure tiles to the "MyEmpath iOS" PostHog dashboard so the
// raw `otp_sending_failed` count is never read on its own again.
//
// WHY: the iOS event fires for every non-2xx on an OTP send, INCLUDING the
// login path's 404 "no account for this number" (reason=user_not_registered),
// which is a normal outcome routed to a sign-up prompt, not a failure. Read
// undifferentiated, the event over-counts real failures (seen 2026-09-10).
// The `reason` property (sent since iOS 2026-08-05, so present in 10.2.0+)
// maps the otpGuard contract: rate_limited (429: cooldown / per-IP / hourly
// budget), invalid_or_unsupported_number (400: country not allowlisted, or
// malformed), user_not_registered (404), failed (anything else: Twilio error,
// network).
//
// Idempotent: tiles are matched by name and PATCHed if they already exist.
//
// Usage:
//   POSTHOG_PERSONAL_API_KEY=phx_... node scripts/add-otp-failure-insights.mjs
//   (optional: POSTHOG_DASHBOARD_ID, default 237832 = "MyEmpath iOS")
//
// The key is a *personal* API key (PostHog → Settings → Personal API keys)
// with insight + dashboard write scopes — NOT the phc_ project token.

const API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const HOST = process.env.POSTHOG_API_HOST || 'https://us.posthog.com';
const DASHBOARD_ID = Number(process.env.POSTHOG_DASHBOARD_ID || 237832);
if (!API_KEY) {
  console.error('Set POSTHOG_PERSONAL_API_KEY (phx_...) — personal key with insight+dashboard write scopes.');
  process.exit(1);
}

const DATE_RANGE = { date_from: '-60d' };

async function api(path, body, method = body ? 'POST' : 'GET') {
  const res = await fetch(`${HOST}${path}`, {
    method,
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

const dashboard = await api(`/api/projects/@current/dashboards/${DASHBOARD_ID}/`);
const byName = new Map(
  (dashboard.tiles || [])
    .filter((t) => t.insight)
    .map((t) => [t.insight.name, t.insight]),
);
console.log(`dashboard #${DASHBOARD_ID} "${dashboard.name}" — ${byName.size} insight tiles`);

const upsert = async (name, source, description = '') => {
  const existing = byName.get(name);
  if (existing) {
    await api(`/api/projects/@current/insights/${existing.id}/`, {
      description,
      query: { kind: 'InsightVizNode', source },
    }, 'PATCH');
    console.log('updated:', name);
  } else {
    await api('/api/projects/@current/insights/', {
      name,
      description,
      query: { kind: 'InsightVizNode', source },
      saved: true,
      dashboards: [DASHBOARD_ID],
    });
    console.log('created:', name);
  }
};

// 1. The breakdown — this is the tile to look at instead of the raw event list.
await upsert(
  'OTP send failures by reason',
  {
    kind: 'TrendsQuery',
    series: [{ kind: 'EventsNode', event: 'otp_sending_failed', math: 'total' }],
    breakdownFilter: { breakdown: 'reason', breakdown_type: 'event' },
    trendsFilter: { display: 'ActionsLineGraph' },
    interval: 'day',
    dateRange: DATE_RANGE,
  },
  'otp_sending_failed split by the `reason` property. user_not_registered is the login path\'s ' +
  '404 (no account yet) — a normal outcome, not a failure. rate_limited = 429 from otpGuard ' +
  '(60s cooldown, per-IP, or the shared international hourly budget — the latter is what a ' +
  'pumping burst exhausts). invalid_or_unsupported_number = 400 (country not allowlisted, or malformed).',
);

// 2. Real failures against successful sends, so the rate is visible at a glance.
await upsert(
  'OTP sends vs real failures',
  {
    kind: 'TrendsQuery',
    series: [
      { kind: 'EventsNode', event: 'otp_sent', math: 'total', custom_name: 'sent' },
      {
        kind: 'EventsNode',
        event: 'otp_sending_failed',
        math: 'total',
        custom_name: 'failed (excl. no-account 404)',
        properties: [
          { key: 'reason', value: ['user_not_registered'], operator: 'is_not', type: 'event' },
        ],
      },
    ],
    trendsFilter: { display: 'ActionsLineGraph' },
    interval: 'day',
    dateRange: DATE_RANGE,
  },
  'Successful OTP sends next to failures that are not the login path\'s "no account" 404. ' +
  'A failure spike with flat sends on a single day is the signature of a pumping burst ' +
  'exhausting the international hourly budget (see empath-heroku docs/sms-otp.md).',
);

console.log(`\nDone → ${HOST}/dashboard/${DASHBOARD_ID}`);
