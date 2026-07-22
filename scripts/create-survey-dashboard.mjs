// Creates the PostHog dashboard for the /survey page (SurveyPage.tsx).
// Re-running creates a NEW dashboard unless POSTHOG_DASHBOARD_ID is set, in
// which case insights are added to that existing dashboard.
//
// Usage:
//   POSTHOG_PERSONAL_API_KEY=phx_... node scripts/create-survey-dashboard.mjs
//
// The key is a *personal* API key (PostHog → Settings → Personal API keys)
// with dashboard + insight write scopes — NOT the phc_ project token.
// Optionally set POSTHOG_API_HOST (defaults to https://us.posthog.com, the
// API host for the us.i.posthog.com ingestion region).

const API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const HOST = process.env.POSTHOG_API_HOST || 'https://us.posthog.com';
if (!API_KEY) {
  console.error('Set POSTHOG_PERSONAL_API_KEY (phx_...) — see header comment.');
  process.exit(1);
}

const SURVEY_ID = 'user_feedback_2026_07'; // keep in sync with SurveyPage.tsx

const QUESTIONS = [
  ['journaling_frequency', 'Q1 · How often do you currently journal in Empath?'],
  ['journal_methods', 'Q2 · How do you usually create journals?'],
  ['open_triggers', 'Q3 · What prompts you to open Empath?'],
  ['features_used', 'Q4 · Which features have you used?'],
  ['most_missed_feature', 'Q5 · Feature you would miss most'],
  ['journaling_friction', 'Q6 · What makes journaling difficult?'],
  ['empath_benefits', 'Q7 · How has Empath helped?'],
  ['feature_needs_improvement', 'Q9 · Feature needing most improvement'],
  ['desired_additions', 'Q10 · Most-wanted additions'],
  ['therapist_sharing_interest', 'Q11 · Interest in therapist sharing'],
  ['data_comfort', 'Q12 · Data comfortable being used for patterns'],
  ['usage_hesitations', 'Q13 · Hesitations about using Empath more'],
  ['payment_intent', 'Q14 · Willingness to pay'],
];

const MATRIX_ROWS = [
  ['written_journaling', 'Q8 · Usefulness: Written journaling'],
  ['voice_journaling', 'Q8 · Usefulness: Voice journaling'],
  ['call_to_journal', 'Q8 · Usefulness: Call to journal'],
  ['ai_chat', 'Q8 · Usefulness: AI chat'],
  ['mood_tracking', 'Q8 · Usefulness: Mood tracking'],
  ['deeper_insights', 'Q8 · Usefulness: Deeper Insights'],
];

const surveyFilter = { key: 'survey_id', value: [SURVEY_ID], operator: 'exact', type: 'event' };
const props = (...extra) => [surveyFilter, ...extra];

async function api(path, body) {
  const res = await fetch(`${HOST}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

let dashboardId = process.env.POSTHOG_DASHBOARD_ID;
if (!dashboardId) {
  const dashboard = await api('/api/projects/@current/dashboards/', {
    name: `Empath User Feedback Survey (${SURVEY_ID})`,
    description:
      'Responses from empathdash.com/survey (opened via the iOS marketing-campaign bottom sheet). ' +
      'No DB storage — events only. Multi-select questions fire one survey_answer per selected option. ' +
      'Free-text follow-ups (feature_improvement_detail, sharing_controls_needed, *_other) live on survey_completed events.',
  });
  dashboardId = dashboard.id;
}
console.log(`dashboard #${dashboardId}: ${HOST}/dashboard/${dashboardId}`);

const insight = (name, source, description = '') =>
  api('/api/projects/@current/insights/', {
    name,
    description,
    query: { kind: 'InsightVizNode', source },
    saved: true,
    dashboards: [Number(dashboardId)],
  });

const trendsBar = (properties, opts = {}) => ({
  kind: 'TrendsQuery',
  series: [{ kind: 'EventsNode', event: 'survey_answer', math: opts.math || 'total' }],
  breakdownFilter: { breakdown: opts.breakdown || 'answer', breakdown_type: 'event' },
  trendsFilter: { display: 'ActionsBarValue' },
  dateRange: { date_from: '-90d' },
  properties,
});

// Overview tiles
await insight('Completion funnel', {
  kind: 'FunnelsQuery',
  series: [
    { kind: 'EventsNode', event: 'survey_viewed' },
    { kind: 'EventsNode', event: 'survey_completed' },
  ],
  funnelsFilter: { funnelVizType: 'steps' },
  dateRange: { date_from: '-90d' },
  properties: props(),
}, 'Share of viewers who finish the survey.');
console.log('insight: Completion funnel');

await insight('Views & completions over time', {
  kind: 'TrendsQuery',
  series: [
    { kind: 'EventsNode', event: 'survey_viewed', math: 'total' },
    { kind: 'EventsNode', event: 'survey_completed', math: 'total' },
  ],
  trendsFilter: { display: 'ActionsLineGraph' },
  interval: 'day',
  dateRange: { date_from: '-90d' },
  properties: props(),
});
console.log('insight: Views & completions over time');

await insight('Respondents who left contact info', {
  kind: 'TrendsQuery',
  series: [{ kind: 'EventsNode', event: 'survey_completed', math: 'total' }],
  trendsFilter: { display: 'BoldNumber' },
  dateRange: { date_from: '-90d' },
  properties: props({ key: 'respondent_email', operator: 'is_set', value: 'is_set', type: 'event' }),
}, 'survey_completed events with respondent_email set.');
console.log('insight: Respondents who left contact info');

await insight(
  'Drop-off by question',
  trendsBar(props(), { breakdown: 'question_id', math: 'dau' }),
  'Unique users answering each question — where people abandon.',
);
console.log('insight: Drop-off by question');

// One bar chart per question
for (const [qid, name] of QUESTIONS) {
  await insight(name, trendsBar(props({ key: 'question_id', value: [qid], operator: 'exact', type: 'event' })));
  console.log('insight:', name);
}

// One bar chart per matrix row
for (const [row, name] of MATRIX_ROWS) {
  await insight(name, trendsBar(props({ key: 'question_id', value: [`feature_usefulness.${row}`], operator: 'exact', type: 'event' })));
  console.log('insight:', name);
}

console.log(`\nDone → ${HOST}/dashboard/${dashboardId}`);
