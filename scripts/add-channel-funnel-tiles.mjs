// Add the 2026-08-07 channel-funnel metrics to the marketing PostHog
// dashboard: prefilled-link clicks (channel_link_clicked, web), conversations
// actually started (channel_first_message, fired by empath-heroku when the
// ref code arrives in a first message), QR-scan conversions, the 3rd-entry
// app pitch (app_pitch_sent), and a HogQL click→conversation table.
//
// NOTE: channel_first_message / app_pitch_sent are SERVER events (source:
// empath-heroku) — they carry no UTM super properties, so those tiles are
// all-traffic. Ad attribution happens in the HogQL tile by joining the
// server event's ref_code back to the web click that carried the UTMs.
//
// Usage:
//   POSTHOG_PERSONAL_API_KEY=phx_... node scripts/add-channel-funnel-tiles.mjs
//   (optional: POSTHOG_DASHBOARD_ID, default 1946739)
//
// Idempotent: tiles are upserted by insight name.

const API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const HOST = process.env.POSTHOG_API_HOST || 'https://us.posthog.com';
const DASHBOARD_ID = Number(process.env.POSTHOG_DASHBOARD_ID || 1946739);
if (!API_KEY) {
  console.error('Set POSTHOG_PERSONAL_API_KEY (phx_...) — personal key with insight+dashboard write scopes.');
  process.exit(1);
}

const DATE_RANGE = { date_from: '-30d' };

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
  (dashboard.tiles || []).filter((t) => t.insight).map((t) => [t.insight.name, t.insight]),
);
console.log(`dashboard #${DASHBOARD_ID} "${dashboard.name}" — ${byName.size} insight tiles`);

// `query` is the full node (InsightVizNode for trends, DataTableNode for HogQL).
const upsert = async (name, query, description = '') => {
  const existing = byName.get(name);
  if (existing) {
    await api(`/api/projects/@current/insights/${existing.id}/`, { description, query }, 'PATCH');
    console.log('updated:', name);
  } else {
    await api('/api/projects/@current/insights/', {
      name, description, query, saved: true, dashboards: [DASHBOARD_ID],
    });
    console.log('created:', name);
  }
};

const trends = (source) => ({ kind: 'InsightVizNode', source });

// ---- 1. Prefilled-link clicks by channel ------------------------------------

await upsert('Channel link clicks by channel (all traffic)', trends({
  kind: 'TrendsQuery',
  series: [{ kind: 'EventsNode', event: 'channel_link_clicked', math: 'total' }],
  breakdownFilter: { breakdown: 'channel', breakdown_type: 'event' },
  trendsFilter: { display: 'ActionsBarValue' },
  dateRange: DATE_RANGE,
}), 'Canonical cross-surface channel CTA event (added 2026-08-07): every WhatsApp/Telegram/Messenger/Instagram deep-link tap, carrying the session ref_code. All traffic — split by ad source in the click→conversation table below.');

// ---- 2. Conversations actually started --------------------------------------

await upsert('Conversations started from the site (channel_first_message)', trends({
  kind: 'TrendsQuery',
  series: [{ kind: 'EventsNode', event: 'channel_first_message', math: 'total' }],
  breakdownFilter: { breakdown: 'channel', breakdown_type: 'event' },
  trendsFilter: { display: 'ActionsBarValue' },
  dateRange: DATE_RANGE,
}), 'SERVER event from empath-heroku: a first inbound message arrived carrying a website ref code — i.e. the click actually became a conversation. Once per (user, code). No UTM props here; attribution joins via ref_code.');

await upsert('QR-scan conversations (desktop → phone)', trends({
  kind: 'TrendsQuery',
  series: [{
    kind: 'EventsNode',
    event: 'channel_first_message',
    math: 'total',
    properties: [{ key: 'via_qr', value: ['true'], operator: 'exact', type: 'event' }],
  }],
  trendsFilter: { display: 'BoldNumber' },
  dateRange: DATE_RANGE,
}), 'channel_first_message with via_qr=true: desktop visitors who scanned the hero QR and started a WhatsApp conversation (the QR ref code carries a trailing Q).');

// ---- 3. Click → conversation rate, attributed -------------------------------

await upsert('Click → conversation rate by source & channel (30d)', {
  kind: 'DataTableNode',
  source: {
    kind: 'HogQLQuery',
    query: `
SELECT
  clicks.utm_source AS utm_source,
  clicks.channel AS channel,
  count(DISTINCT clicks.ref_code) AS link_clicks,
  count(DISTINCT conv.ref_code) AS conversations,
  round(100.0 * count(DISTINCT conv.ref_code) / nullif(count(DISTINCT clicks.ref_code), 0), 1) AS conversion_pct
FROM (
  SELECT
    toString(properties.ref_code) AS ref_code,
    toString(properties.channel) AS channel,
    coalesce(nullif(toString(properties.utm_source), ''), 'organic') AS utm_source
  FROM events
  WHERE event = 'channel_link_clicked' AND timestamp > now() - INTERVAL 30 DAY
) AS clicks
LEFT JOIN (
  SELECT DISTINCT replaceRegexpOne(toString(properties.ref_code), 'Q$', '') AS ref_code
  FROM events
  WHERE event = 'channel_first_message' AND timestamp > now() - INTERVAL 30 DAY
) AS conv ON conv.ref_code = clicks.ref_code
GROUP BY utm_source, channel
ORDER BY link_clicks DESC`.trim(),
  },
}, 'THE funnel number this dashboard was missing: of the people who tapped a channel button, how many actually sent a first message — joined on the session ref_code (web click ↔ server first-message), split by ad source and channel. QR codes join via their base code.');

// ---- 4. App pitch (3rd-entry nudge) ------------------------------------------

await upsert('App pitches sent to messaging users (app_pitch_sent)', trends({
  kind: 'TrendsQuery',
  series: [{ kind: 'EventsNode', event: 'app_pitch_sent', math: 'total' }],
  breakdownFilter: { breakdown: 'offer_code', breakdown_type: 'event' },
  trendsFilter: { display: 'ActionsBarValue' },
  dateRange: DATE_RANGE,
}), 'SERVER event: milestone app nudge appended to a journal-save reply (entries 3/7/15/30, phone-only users). Breakdown offer_code=true means a 1-month Empath+ redeem link rode along (APP_PITCH_OFFER_ENABLED). Redemption tracking lives in empath-admin → Purchases → Offer Codes.');

console.log(`\nDone → ${HOST}/dashboard/${DASHBOARD_ID}`);
