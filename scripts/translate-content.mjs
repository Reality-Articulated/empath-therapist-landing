/**
 * translate-content.mjs — bulk-translate blog posts with the OpenAI API
 * (same key/model the empath-ios translate.yml workflow uses, so no Claude
 * tokens are spent on volume translation).
 *
 * For each post × locale it writes
 *   src/data/i18n/<locale>/<kind>/<slug>.json
 * containing the post's translated text fields. Those files light up
 * automatically everywhere:
 *   - runtime: src/data/i18n/useTranslatedPost.ts lazy-merges them per route
 *   - build:   scripts/prerender.mjs emits /<locale>/app/blog/<slug> HTML
 *              with hreflang clusters; generate-sitemap.mjs lists the URLs
 *
 * Usage:
 *   OPENAI_API_KEY=… node scripts/translate-content.mjs --locale es
 *   node scripts/translate-content.mjs --locale all --kind journaling
 *   node scripts/translate-content.mjs --locale pt --slug chat-journaling
 *   node scripts/translate-content.mjs --locale de --limit 5 --concurrency 4
 *
 * Key resolution: $OPENAI_API_KEY, else OPENAI_API_KEY= line in
 * ../empath-heroku/backend/.env (same fallback as empath-ios scripts).
 * Idempotent — existing JSONs are skipped unless --force.
 * Full corpus ≈ 55 posts × 6 locales; expect a long run — use --locale/--kind
 * to batch, progress is checkpointed per file so re-runs resume for free.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import ts from 'typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_ROOT = join(ROOT, 'src/data/i18n');
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = process.env.TRANSLATE_MODEL || 'gpt-4o-mini';

// Keep in sync with src/i18n/locales.ts.
const LOCALES = {
  es: 'neutral Latin-American Spanish (tú, never vosotros/vos); say "sin registro", never "sin cuenta"',
  pt: 'Brazilian Portuguese (você); say "sem cadastro", never "sem conta"',
  hi: 'natural conversational Hindi in Devanagari; common English loanwords (journal, app, voice note) are welcome where urban Indians actually use them',
  de: 'German with du (consumer app voice, never Sie); "ohne Registrierung", never "ohne Konto"',
  fr: 'French with tu (young consumer audience); "sans inscription", never "sans compte"',
  it: 'Italian with tu; "senza registrazione", never "senza account"',
};

// Fields that must never reach the model (identity, dates, citations, links).
const EXCLUDE_KEYS = ['slug', 'date', 'author', 'sources', 'relatedSlugs'];

// ---------------------------------------------------------------- CLI args
const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
};
const localeArg = flag('locale', 'all');
const kindArg = flag('kind', 'all'); // journaling | therapist | all
const slugArg = flag('slug', null);
const limit = Number(flag('limit', Infinity));
const concurrency = Math.max(1, Number(flag('concurrency', 3)));
const force = args.includes('--force');

const locales = localeArg === 'all' ? Object.keys(LOCALES) : [localeArg];
for (const code of locales) {
  if (!LOCALES[code]) {
    console.error(`Unknown locale "${code}". Known: ${Object.keys(LOCALES).join(', ')}`);
    process.exit(1);
  }
}

// ---------------------------------------------------------------- API key
function resolveApiKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  const envFile = join(ROOT, '../empath-heroku/backend/.env');
  if (existsSync(envFile)) {
    const match = readFileSync(envFile, 'utf-8').match(/^OPENAI_API_KEY=(.+)$/m);
    if (match) return match[1].trim();
  }
  console.error('No OPENAI_API_KEY in env or ../empath-heroku/backend/.env');
  process.exit(1);
}
const API_KEY = resolveApiKey();

// ------------------------------------------------- load posts (TS modules)
async function loadTsExport(filePath, exportName, transformSource = (s) => s) {
  const source = transformSource(readFileSync(filePath, 'utf-8'));
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    fileName: filePath,
  });
  const loaded = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
  return loaded[exportName];
}

const kinzer = (await loadTsExport(join(ROOT, 'src/data/kinzerJournalingBlogPosts.ts'), 'kinzerJournalingBlogPosts')) ?? [];
const legacy = (await loadTsExport(
  join(ROOT, 'src/data/journalingBlogPosts.ts'),
  'journalingBlogPosts',
  (s) => s
    .replace("import { kinzerJournalingBlogPosts } from './kinzerJournalingBlogPosts';", '')
    .replace('...kinzerJournalingBlogPosts,', '')
)) ?? [];
const therapist = (await loadTsExport(join(ROOT, 'src/data/blogPosts.ts'), 'blogPosts')) ?? [];

const corpora = [
  { kind: 'journaling', posts: [...kinzer, ...legacy] },
  { kind: 'therapist', posts: therapist },
].filter((c) => kindArg === 'all' || c.kind === kindArg);

// ---------------------------------------------------------------- OpenAI
async function chatJson(system, user, attempt = 1) {
  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });
  if (res.status === 429 || res.status >= 500) {
    if (attempt >= 4) throw new Error(`OpenAI ${res.status} after ${attempt} attempts`);
    const wait = 2000 * attempt;
    await new Promise((r) => setTimeout(r, wait));
    return chatJson(system, user, attempt + 1);
  }
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const body = await res.json();
  return JSON.parse(body.choices[0].message.content);
}

function systemPrompt(locale) {
  return [
    `You translate marketing/editorial blog content for Empath — a product that lets people keep a private journal by texting, WhatsApping, or calling a phone number (no app needed).`,
    `Target language: ${LOCALES[locale]}.`,
    `You receive a JSON object. Return a JSON object with EXACTLY the same structure and keys.`,
    `Translate ONLY human-readable string values (titles, paragraphs, questions, answers, labels, captions).`,
    `Never translate or alter: URLs, paths, product names (Empath, WhatsApp, Telegram, Instagram, Day One, Apple Health, App Store, HIPAA), numbers, statistical notations (d ≈ 0.31), phone numbers, JSON keys.`,
    `Register: warm, direct, editorial — translate idioms by meaning, never word-for-word. Keep headline punchiness.`,
    `SEO fields (seoTitle, metaDescription, keyword) should read like natural search-language in the target locale.`,
  ].join('\n');
}

// Deep-compare key structure so a dropped section/faq entry fails loudly.
// Returns the path of the first mismatch, or null when the shapes agree.
function firstShapeDiff(a, b, path = '$') {
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return `${path} (array → ${typeof b})`;
    if (a.length !== b.length) return `${path} (length ${a.length} → ${b.length})`;
    for (let i = 0; i < a.length; i++) {
      const diff = firstShapeDiff(a[i], b[i], `${path}[${i}]`);
      if (diff) return diff;
    }
    return null;
  }
  if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object' || Array.isArray(b)) return `${path} (object → ${Array.isArray(b) ? 'array' : typeof b})`;
    const ak = Object.keys(a).sort();
    const bk = Object.keys(b).sort();
    const missing = ak.filter((k) => !bk.includes(k));
    const added = bk.filter((k) => !ak.includes(k));
    if (missing.length || added.length) {
      return `${path} (missing: ${missing.join(',') || '—'}; added: ${added.join(',') || '—'})`;
    }
    for (const k of ak) {
      const diff = firstShapeDiff(a[k], b[k], `${path}.${k}`);
      if (diff) return diff;
    }
    return null;
  }
  return typeof a === typeof b ? null : `${path} (${typeof a} → ${typeof b})`;
}

async function translatePost(post, kind, locale) {
  const outDir = join(OUT_ROOT, locale, kind);
  const outPath = join(outDir, `${post.slug}.json`);
  if (!force && existsSync(outPath)) return 'skipped';

  const translatable = {};
  const excluded = {};
  for (const [k, v] of Object.entries(post)) {
    (EXCLUDE_KEYS.includes(k) ? excluded : translatable)[k] = v;
  }

  const translated = await chatJson(systemPrompt(locale), JSON.stringify(translatable));
  const diff = firstShapeDiff(translatable, translated);
  if (diff) {
    throw new Error(`shape mismatch at ${diff}`);
  }

  mkdirSync(outDir, { recursive: true });
  // Excluded fields are re-attached verbatim so the merged object is complete
  // and provably untampered where it matters (dates, citations, slug).
  writeFileSync(outPath, JSON.stringify({ ...translated, ...excluded, slug: post.slug }, null, 2) + '\n');
  return 'written';
}

// ------------------------------------------------------------------ run
const queue = [];
for (const { kind, posts } of corpora) {
  for (const post of posts) {
    if (slugArg && post.slug !== slugArg) continue;
    for (const locale of locales) queue.push({ post, kind, locale });
  }
}
const work = queue.slice(0, limit === Infinity ? undefined : limit);
console.log(`${work.length} translation task(s) (model ${MODEL}, concurrency ${concurrency})`);

let written = 0, skipped = 0, failed = 0;
async function worker() {
  for (;;) {
    const task = work.shift();
    if (!task) return;
    const label = `${task.locale}/${task.kind}/${task.post.slug}`;
    try {
      const result = await translatePost(task.post, task.kind, task.locale);
      if (result === 'written') { written++; console.log(`  ✓ ${label}`); }
      else skipped++;
    } catch (err) {
      failed++;
      console.error(`  ✗ ${label}: ${err.message}`);
    }
  }
}
await Promise.all(Array.from({ length: concurrency }, worker));
console.log(`Done: ${written} written, ${skipped} already existed, ${failed} failed.`);
if (failed > 0) process.exitCode = 1;
