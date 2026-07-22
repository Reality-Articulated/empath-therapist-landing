/**
 * Build-time prerender: emits per-route static HTML so non-JS crawlers
 * (Twitter, Slack, LinkedIn, iMessage, ChatGPT, Perplexity, etc.) see the
 * correct metadata and readable page content for every route. JS-enabled
 * browsers replace the fallback body with React; non-JS search and AI crawlers
 * can still extract the complete article, FAQ, sources, and calls to action.
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
import ts from 'typescript';

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
    title: 'Empath - Journaling As Easy As Texting a Friend',
    description: 'Empath lets you journal by text, WhatsApp, or call — no app to open, no blank page. Capture how you feel the moment it happens, then open the app to see your mood patterns and insights over time.',
    keywords: 'journal by text, voice journaling, AI journaling app, mood tracking, mental health app, text journaling, WhatsApp journal, journaling without an app, journaling by phone call, chat journaling, AI journaling assistant, conversational journaling, journaling plan, journaling habit tracker',
  },
  {
    path: '/app',
    title: 'Empath - Journaling As Easy As Texting a Friend',
    description: 'Empath lets you journal by text, WhatsApp, or call — no app to open, no blank page. Capture how you feel the moment it happens, then open the app to see your mood patterns and insights over time.',
    keywords: 'journal by text, voice journaling, AI journaling app, mood tracking, mental health app, text journaling, WhatsApp journal, journaling without an app, journaling by phone call, chat journaling, AI journaling assistant, conversational journaling, journaling plan, journaling habit tracker',
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

// The blog files are plain TypeScript data modules. Transpiling and loading them
// keeps prerender output in lockstep with the content users see in React.
async function loadBlogPosts(filePath, exportName) {
  const source = readFileSync(filePath, 'utf-8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filePath,
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`;
  const loaded = await import(moduleUrl);
  return Array.isArray(loaded[exportName]) ? loaded[exportName] : [];
}

const monthNumbers = {
  January: '01',
  February: '02',
  March: '03',
  April: '04',
  May: '05',
  June: '06',
  July: '07',
  August: '08',
  September: '09',
  October: '10',
  November: '11',
  December: '12',
};

// Parse human dates without passing through the machine's local timezone.
function toIsoDate(s) {
  if (!s) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;

  const humanDate = /^(\w+)\s+(\d{1,2}),\s+(\d{4})$/.exec(s);
  if (humanDate && monthNumbers[humanDate[1]]) {
    return `${humanDate[3]}-${monthNumbers[humanDate[1]]}-${humanDate[2].padStart(2, '0')}`;
  }

  const t = Date.parse(s);
  if (Number.isNaN(t)) return s;
  return new Date(t).toISOString().split('T')[0];
}

const therapistBlogs = (await loadBlogPosts(join(ROOT, 'src/data/blogPosts.ts'), 'blogPosts')).map((p) => ({
  ...p,
  path: `/blog/${p.slug}`,
  ogType: 'article',
  keywords: [p.keyword, p.category, 'mental health'].filter(Boolean).join(', '),
}));
const journalingBlogs = (await loadBlogPosts(
  join(ROOT, 'src/data/journalingBlogPosts.ts'),
  'journalingBlogPosts'
)).map((p) => ({
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
  article: {
    author: p.author,
    date: p.date,
    category: p.category,
    abstract: p.answerSummary,
    citations: p.sources?.map((source) => source.url) ?? [],
    content: p,
  },
}));

const allRoutes = [...staticRoutes, ...blogRoutes];

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

function htmlEscape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function articleWordCount(post) {
  return [
    post.answerSummary,
    post.intro,
    ...(post.sections ?? []).flatMap((section) => section.body ?? []),
    ...(post.faq ?? []).flatMap((item) => [item.question, item.answer]),
  ]
    .filter(Boolean)
    .join(' ')
    .trim()
    .split(/\s+/).length;
}

function renderStaticArticle(route, canonical) {
  const post = route.article?.content;
  if (!post) return '';

  const takeaways = post.keyTakeaways?.length
    ? post.keyTakeaways
    : (post.sections ?? []).slice(0, 3).map((section) => section.heading);
  const quickAnswer = post.answerSummary
    ? `<section class="pr-answer"><p class="pr-label">Quick answer</p><p>${htmlEscape(post.answerSummary)}</p></section>`
    : '';
  const takeawayHtml = takeaways.length
    ? `<section><h2>Key takeaways</h2><ul>${takeaways.map((item) => `<li>${htmlEscape(item)}</li>`).join('')}</ul></section>`
    : '';
  const sectionHtml = (post.sections ?? [])
    .map(
      (section) =>
        `<section><h2>${htmlEscape(section.heading)}</h2>${(section.body ?? [])
          .map((paragraph) => `<p>${htmlEscape(paragraph)}</p>`)
          .join('')}</section>`
    )
    .join('');
  const sourceHtml = post.sources?.length
    ? `<section id="sources"><h2>Sources and further reading</h2><ol>${post.sources
        .map(
          (source) =>
            `<li><a href="${htmlEscape(source.url)}">${htmlEscape(source.title)}</a><br><small>${htmlEscape(source.authors)}. <em>${htmlEscape(source.publication)}</em> (${htmlEscape(source.year)}).</small></li>`
        )
        .join('')}</ol></section>`
    : '';
  const faqHtml = post.faq?.length
    ? `<section id="faq"><h2>Frequently asked questions</h2>${post.faq
        .map(
          (item) =>
            `<h3>${htmlEscape(item.question)}</h3><p>${htmlEscape(item.answer)}</p>`
        )
        .join('')}</section>`
    : '';

  return `
    <style>
      [data-prerendered-article] { max-width: 760px; margin: 0 auto; padding: 48px 24px 72px; color: #292524; font: 17px/1.75 Georgia, serif; }
      [data-prerendered-article] nav, [data-prerendered-article] .pr-meta, [data-prerendered-article] .pr-label { font-family: ui-sans-serif, sans-serif; }
      [data-prerendered-article] nav { margin-bottom: 36px; font-weight: 700; }
      [data-prerendered-article] a { color: #1166b8; }
      [data-prerendered-article] h1 { margin: 12px 0 16px; font-size: clamp(36px, 7vw, 60px); line-height: 1.05; }
      [data-prerendered-article] h2 { margin: 48px 0 14px; font-size: 30px; line-height: 1.2; }
      [data-prerendered-article] h3 { margin: 28px 0 8px; font-size: 21px; line-height: 1.3; }
      [data-prerendered-article] p { margin: 0 0 18px; }
      [data-prerendered-article] li { margin-bottom: 10px; }
      [data-prerendered-article] .pr-meta { color: #78716c; font-size: 14px; font-weight: 650; }
      [data-prerendered-article] .pr-dek { color: #57534e; font-size: 21px; line-height: 1.55; }
      [data-prerendered-article] .pr-answer { margin: 38px 0; padding: 24px; border: 2px solid #292524; border-radius: 12px; background: #eaf5ff; box-shadow: 6px 6px 0 #1b8af1; }
      [data-prerendered-article] .pr-answer p:last-child { margin: 0; font-family: ui-sans-serif, sans-serif; font-size: 19px; font-weight: 750; line-height: 1.6; }
      [data-prerendered-article] .pr-label { margin-bottom: 8px; color: #1166b8; font-size: 12px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
      [data-prerendered-article] .pr-cta { margin-top: 48px; padding: 28px; border-radius: 12px; background: #292524; color: white; }
      [data-prerendered-article] .pr-cta h2 { margin-top: 0; }
      [data-prerendered-article] .pr-cta a { display: inline-block; padding: 10px 16px; border-radius: 8px; background: #1b8af1; color: white; font-family: ui-sans-serif, sans-serif; font-weight: 800; text-decoration: none; }
    </style>
    <main data-prerendered-article>
      <nav><a href="${SITE_URL}/app/blog">Empath Journaling Blog</a></nav>
      <article>
        <header>
          <p class="pr-meta">${htmlEscape(post.category)} &middot; ${htmlEscape(post.author)} &middot; ${htmlEscape(post.date)} &middot; ${htmlEscape(post.readTime)}</p>
          <h1>${htmlEscape(post.title)}</h1>
          <p class="pr-dek">${htmlEscape(post.excerpt)}</p>
        </header>
        ${quickAnswer}
        <p>${htmlEscape(post.intro)}</p>
        ${takeawayHtml}
        ${sectionHtml}
        ${sourceHtml}
        ${faqHtml}
        <section class="pr-cta">
          <h2>Turn reflection into action with Empath</h2>
          <p>Call, text, or type what is happening, notice recurring patterns, and keep your next step connected to the moment that created it.</p>
          <a href="${SITE_URL}/atman/">Try Empath free</a>
        </section>
        <p class="pr-meta">This article is educational and is not a substitute for professional mental health advice. Canonical URL: <a href="${canonical}">${canonical}</a></p>
      </article>
    </main>`;
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
  let faqLd = '';
  if (route.article && route.article.author && route.article.date) {
    const post = route.article.content;
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post?.title ?? route.title,
      description: route.description,
      abstract: route.article.abstract || undefined,
      author: { '@type': 'Organization', name: route.article.author, url: SITE_URL },
      datePublished: toIsoDate(route.article.date),
      dateModified: toIsoDate(route.article.date),
      image: ogImage,
      publisher: {
        '@type': 'Organization',
        name: 'Empath',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/empath-logo.png` },
      },
      url: canonical,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      articleSection: route.article.category || undefined,
      keywords: route.keywords || undefined,
      citation: route.article.citations.length ? route.article.citations : undefined,
      wordCount: post ? articleWordCount(post) : undefined,
      inLanguage: 'en-US',
      isAccessibleForFree: true,
    };
    articleLd = `\n    <script type="application/ld+json" data-prerendered-schema>${JSON.stringify(articleSchema)}</script>`;

    if (post?.faq?.length) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      };
      faqLd = `\n    <script type="application/ld+json" data-prerendered-schema>${JSON.stringify(faqSchema)}</script>`;
    }
  }

  return { canonical, title, description, ogType, ogImage, keywordsTag, articleLd, faqLd };
}

function rewriteHtml(html, route) {
  const { canonical, title, description, ogType, ogImage, keywordsTag, articleLd, faqLd } = buildHeadMeta(route);

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

  // Inject canonical and structured data before </head>.
  const canonicalTag = `<link rel="canonical" href="${canonical}" />`;
  out = out.replace(/<\/head>/, `    ${canonicalTag}${articleLd}${faqLd}\n  </head>`);

  const staticArticle = renderStaticArticle(route, canonical);
  if (staticArticle) {
    out = out.replace('<div id="root"></div>', `<div id="root">${staticArticle}</div>`);
  }

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
