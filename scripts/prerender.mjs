/**
 * Build-time prerender: emits per-route static HTML so non-JS crawlers
 * (Twitter, Slack, LinkedIn, iMessage, ChatGPT, Perplexity, etc.) see the
 * correct <title>, <meta description>, OG/Twitter tags, and canonical URL
 * for every route. Google still renders JS and consumes runtime helmet
 * updates, but indexing is faster when the initial HTML already matches.
 *
 * Strategy: take dist/index.html (built by `vite build`) as a template,
 * rewrite the head meta block per route, and write to dist/<route>/index.html.
 * Vercel serves the per-route file directly; vercel.json's SPA fallback
 * still catches anything not prerendered.
 *
 * IMPORTANT: per-route metadata below must be kept in sync with each page's
 * <SEO /> call in src/pages/*. Runtime helmet wins for JS-enabled crawlers;
 * this map is the source of truth for non-JS crawlers and first-paint indexing.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const SITE_URL = 'https://www.empathdash.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/empath-logo.png`;

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('[prerender] dist/index.html not found — run `vite build` first.');
  process.exit(1);
}

// Static routes — mirror each page's <SEO ... /> props.
// canonicalPath defaults to `path`; set explicitly when a route renders a page
// whose <SEO /> passes a different canonical (e.g. `/` renders JournalingPage
// with path="/app" to consolidate to /app).
const staticRoutes = [
  {
    path: '/',
    canonicalPath: '/app',
    title: 'Empath - AI Journaling & Mood Tracking App',
    description: "Transform your mental wellness with Empath's AI-powered journaling and mood tracking. Get personalized insights, track your emotional patterns, and improve your mental health with intelligent daily reflections.",
    keywords: 'AI journaling app, mood tracking, mental health app, emotional wellness, AI journal, mental wellness tracker, mood diary, daily reflection app',
  },
  {
    path: '/app',
    title: 'Empath - AI Journaling & Mood Tracking App',
    description: "Transform your mental wellness with Empath's AI-powered journaling and mood tracking. Get personalized insights, track your emotional patterns, and improve your mental health with intelligent daily reflections.",
    keywords: 'AI journaling app, mood tracking, mental health app, emotional wellness, AI journal, mental wellness tracker, mood diary, daily reflection app',
  },
  {
    path: '/therapist',
    title: 'Empath for Therapists | Between-Session AI Insights',
    description: 'Empath captures what happens between sessions so therapists can see how clients are doing in real life — not just what they remember to share. AI-powered insights, secure and HIPAA-aligned.',
    keywords: 'therapist software, between-session insights, AI for therapists, therapy outcomes, clinical decision support, therapy practice management',
  },
  {
    path: '/whyempath',
    title: 'Why Empath? | Get More From Your Therapy',
    description: 'Empath helps therapy clients capture insights between sessions so their therapist sees the full picture. Better context, better sessions, better outcomes.',
  },
  {
    path: '/advisory',
    title: 'Clinical Advisory Board | Empath for Therapists',
    description: "Join Empath's clinical advisory board. Help shape the future of between-session data capture and AI-driven clinical insights alongside leading therapists and researchers.",
  },
  {
    path: '/science',
    title: 'The Science Behind Empath | Research-Backed Therapy Insights',
    description: 'Empath is built on decades of psychotherapy research — therapeutic alliance, between-session change, sudden gains, homework effects. See the studies that inform our approach.',
  },
  {
    path: '/calculator',
    title: 'Therapy Value Calculator | Empath',
    description: 'See how much more value you can get from each therapy session by capturing what happens between sessions.',
  },
  {
    path: '/quiz',
    title: 'AI Readiness Quiz for Therapists | Empath',
    description: 'A quick assessment to see where your practice stands on adopting AI tools — and what to do next.',
  },
  {
    path: '/blog',
    title: 'Empath Blog | Research & Practice Insights for Therapists',
    description: 'Evidence-based articles on between-session data, therapeutic alliance, AI in clinical practice, and the science of therapy outcomes.',
  },
  {
    path: '/app/blog',
    title: 'Journaling Blog | Empath - Tips, Reviews & Guides',
    description: 'Guides to journaling apps, mood tracking, mental wellness, and getting more out of your daily reflection practice.',
  },
  {
    path: '/pledge',
    title: 'Our Pledge | Empath',
    description: "Empath's commitment to user privacy, mental health ethics, and responsible AI.",
  },
  {
    path: '/transparency',
    title: 'AI Transparency | Empath',
    description: 'Which AI models Empath uses, what data they see, and the BAAs that protect your information.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Empath',
    description: 'How Empath collects, uses, and protects your data. HIPAA-aligned practices, encryption, and user-controlled privacy settings.',
  },
  {
    path: '/terms',
    title: 'Terms of Service | Empath',
    description: "Empath's terms of service for users and therapists.",
  },
];

// Blog routes: pull seoTitle, metaDescription, slug, date, author, category, keyword
// from the data files via the same regex pattern used in generate-sitemap.mjs.
// Falls back gracefully if a field is missing.
function extractBlogPosts(filePath) {
  const text = readFileSync(filePath, 'utf-8');
  const posts = [];
  // Split on top-level object opens that follow `{` after a newline or array start
  // Then per-post extract fields via regex. Brittle but matches the sitemap script's pattern.
  const slugRe = /slug:\s*['"]([^'"]+)['"]/g;
  const slugs = [];
  let m;
  while ((m = slugRe.exec(text)) !== null) slugs.push({ slug: m[1], idx: m.index });

  for (const { slug, idx } of slugs) {
    // Look backwards from the slug for the post-open brace, forwards for the close
    const before = text.slice(Math.max(0, idx - 4000), idx);
    const after = text.slice(idx, idx + 4000);
    const block = before + after;
    const seoTitle = pluck(block, /seoTitle:\s*['"]((?:[^'"\\]|\\.)*)['"]/);
    const metaDescription = pluck(block, /metaDescription:\s*['"]((?:[^'"\\]|\\.)*)['"]/);
    const title = pluck(block, /title:\s*['"]((?:[^'"\\]|\\.)*)['"]/);
    const author = pluck(block, /author:\s*['"]((?:[^'"\\]|\\.)*)['"]/);
    const date = pluck(block, /date:\s*['"]((?:[^'"\\]|\\.)*)['"]/);
    const category = pluck(block, /category:\s*['"]((?:[^'"\\]|\\.)*)['"]/);
    const keyword = pluck(block, /keyword:\s*['"]((?:[^'"\\]|\\.)*)['"]/);
    posts.push({ slug, seoTitle, metaDescription, title, author, date, category, keyword });
  }
  return posts;
}

function pluck(text, re) {
  const m = re.exec(text);
  return m ? m[1].replace(/\\(['"])/g, '$1') : '';
}

// Convert "March 18, 2026" → "2026-03-18" for schema.org datePublished.
// Falls back to the original string if Date.parse can't interpret it.
function toIsoDate(s) {
  if (!s) return '';
  const t = Date.parse(s);
  if (Number.isNaN(t)) return s;
  return new Date(t).toISOString().split('T')[0];
}

const therapistBlogs = extractBlogPosts(join(ROOT, 'src/data/blogPosts.ts')).map((p) => ({
  ...p,
  path: `/blog/${p.slug}`,
  ogType: 'article',
  keywords: [p.keyword, p.category, 'mental health'].filter(Boolean).join(', '),
}));
const journalingBlogs = extractBlogPosts(join(ROOT, 'src/data/journalingBlogPosts.ts')).map((p) => ({
  ...p,
  path: `/app/blog/${p.slug}`,
  ogType: 'article',
  keywords: [p.keyword, p.category, 'journaling'].filter(Boolean).join(', '),
}));

const blogRoutes = [...therapistBlogs, ...journalingBlogs].map((p) => ({
  path: p.path,
  title: p.seoTitle || `${p.title} | Empath`,
  description: p.metaDescription || '',
  keywords: p.keywords,
  ogType: 'article',
  article: { author: p.author, date: p.date, category: p.category },
}));

const allRoutes = [...staticRoutes, ...blogRoutes];

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

function htmlEscape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildHeadMeta(route) {
  const canonical = `${SITE_URL}${route.canonicalPath ?? route.path}`;
  const title = htmlEscape(route.title);
  const description = htmlEscape(route.description);
  const ogType = route.ogType ?? 'website';
  const ogImage = route.ogImage ?? DEFAULT_OG_IMAGE;
  const keywordsTag = route.keywords
    ? `\n    <meta name="keywords" content="${htmlEscape(route.keywords)}" />`
    : '';

  let articleLd = '';
  if (route.article && route.article.author && route.article.date) {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: route.title,
      description: route.description,
      author: { '@type': 'Person', name: route.article.author },
      datePublished: route.article.date,
      dateModified: route.article.date,
      image: ogImage,
      publisher: {
        '@type': 'Organization',
        name: 'Empath',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/empath-logo.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      articleSection: route.article.category || undefined,
    };
    articleLd = `\n    <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>`;
  }

  return { canonical, title, description, ogType, ogImage, keywordsTag, articleLd };
}

function rewriteHtml(html, route) {
  const { canonical, title, description, ogType, ogImage, keywordsTag, articleLd } = buildHeadMeta(route);

  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  out = out.replace(/<meta\s+name="title"[^>]*\/?>/, `<meta name="title" content="${title}" />`);
  out = out.replace(/<meta\s+name="description"[^>]*\/?>/, `<meta name="description" content="${description}" />`);
  // Replace keywords meta if present, otherwise leave the original generic one alone if route has no keywords.
  if (route.keywords) {
    if (/<meta\s+name="keywords"[^>]*\/?>/.test(out)) {
      out = out.replace(/<meta\s+name="keywords"[^>]*\/?>/, `<meta name="keywords" content="${htmlEscape(route.keywords)}" />`);
    } else {
      out = out.replace(/<meta\s+name="description"[^>]*\/?>/, (m) => `${m}${keywordsTag}`);
    }
  }
  out = out.replace(/<meta\s+property="og:type"[^>]*\/?>/, `<meta property="og:type" content="${ogType}" />`);
  out = out.replace(/<meta\s+property="og:url"[^>]*\/?>/, `<meta property="og:url" content="${canonical}" />`);
  out = out.replace(/<meta\s+property="og:title"[^>]*\/?>/, `<meta property="og:title" content="${title}" />`);
  out = out.replace(/<meta\s+property="og:description"[^>]*\/?>/, `<meta property="og:description" content="${description}" />`);
  out = out.replace(/<meta\s+property="og:image"[^>]*\/?>/, `<meta property="og:image" content="${ogImage}" />`);
  out = out.replace(/<meta\s+property="twitter:url"[^>]*\/?>/, `<meta property="twitter:url" content="${canonical}" />`);
  out = out.replace(/<meta\s+property="twitter:title"[^>]*\/?>/, `<meta property="twitter:title" content="${title}" />`);
  out = out.replace(/<meta\s+property="twitter:description"[^>]*\/?>/, `<meta property="twitter:description" content="${description}" />`);
  out = out.replace(/<meta\s+property="twitter:image"[^>]*\/?>/, `<meta property="twitter:image" content="${ogImage}" />`);

  // Inject <link rel="canonical"> and Article JSON-LD before </head>
  const canonicalTag = `<link rel="canonical" href="${canonical}" />`;
  out = out.replace(/<\/head>/, `    ${canonicalTag}${articleLd}\n  </head>`);

  return out;
}

let written = 0;
let skipped = 0;
for (const route of allRoutes) {
  if (!route.title || !route.description) {
    skipped++;
    continue;
  }
  // For "/", write directly to dist/index.html (overwriting the generic one)
  const outDir = route.path === '/' ? DIST : join(DIST, route.path);
  const outPath = join(outDir, 'index.html');
  if (route.path !== '/') {
    mkdirSync(outDir, { recursive: true });
  }
  writeFileSync(outPath, rewriteHtml(template, route));
  written++;
}

console.log(`[prerender] Wrote ${written} per-route HTML files (skipped ${skipped} routes missing title/description).`);
console.log(`[prerender] ${staticRoutes.length} static + ${therapistBlogs.length} therapist blogs + ${journalingBlogs.length} journaling blogs.`);
