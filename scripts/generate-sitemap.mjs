import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import ts from 'typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SITE_URL = 'https://www.empathdash.com';

// Keep in sync with src/i18n/locales.ts (this script stays dependency-free).
const LOCALE_CODES = ['es', 'pt', 'hi', 'de', 'fr', 'it'];
// Locale-prefixed variants exist for the consumer funnel…
const LOCALIZED_STATIC = ['/', '/app', '/call-me'];
// …and for any blog post with a generated translation JSON.
const translationExists = (code, kind, slug) =>
  existsSync(join(ROOT, 'src/data/i18n', code, kind, `${slug}.json`));

const today = new Date().toISOString().split('T')[0];

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

function toIsoDate(value) {
  const normalized = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) return normalized;

  const humanDate = /^(\w+)\s+(\d{1,2}),\s+(\d{4})$/.exec(normalized);
  if (humanDate && monthNumbers[humanDate[1]]) {
    return `${humanDate[3]}-${monthNumbers[humanDate[1]]}-${humanDate[2].padStart(2, '0')}`;
  }

  const parsed = Date.parse(normalized);
  return Number.isNaN(parsed) ? today : new Date(parsed).toISOString().split('T')[0];
}

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/app', changefreq: 'weekly', priority: '1.0' },
  { path: '/therapist', changefreq: 'weekly', priority: '0.9' },
  { path: '/whyempath', changefreq: 'monthly', priority: '0.8' },
  { path: '/call-me', changefreq: 'monthly', priority: '0.9' },
  { path: '/science', changefreq: 'monthly', priority: '0.8' },
  { path: '/advisory', changefreq: 'monthly', priority: '0.7' },
  { path: '/calculator', changefreq: 'monthly', priority: '0.6' },
  { path: '/quiz', changefreq: 'monthly', priority: '0.6' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/app/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/transparency', changefreq: 'monthly', priority: '0.5' },
  { path: '/pledge', changefreq: 'yearly', priority: '0.4' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

// Load the blog data modules for real (transpiled TS, same as prerender.mjs)
// instead of regex-scraping `slug:` fields — the regex also matched nested
// related-post references, which put duplicate <loc> entries in the sitemap.
// Real post dates become <lastmod> (not the build date) so the signal stays
// credible — Google ignores lastmod when it changes on every deploy.
async function loadTsExport(filePath, exportName, transformSource = (s) => s) {
  const source = transformSource(readFileSync(filePath, 'utf-8'));
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    fileName: filePath,
  });
  const loaded = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
  return loaded[exportName] ?? [];
}

function toSitemapPost(post) {
  return { slug: post.slug, lastmod: post.date ? toIsoDate(post.date) : today };
}

const therapistBlogPosts = (await loadTsExport(join(ROOT, 'src/data/blogPosts.ts'), 'blogPosts')).map(toSitemapPost);
const journalingBlogPosts = [
  ...(await loadTsExport(join(ROOT, 'src/data/kinzerJournalingBlogPosts.ts'), 'kinzerJournalingBlogPosts')),
  ...(await loadTsExport(
    join(ROOT, 'src/data/journalingBlogPosts.ts'),
    'journalingBlogPosts',
    (s) => s
      .replace("import { kinzerJournalingBlogPosts } from './kinzerJournalingBlogPosts';", '')
      .replace('...kinzerJournalingBlogPosts,', '')
  )),
].map(toSitemapPost);

const blogRoutes = [
  ...therapistBlogPosts.flatMap(({ slug, lastmod }) => [
    { path: `/blog/${slug}`, changefreq: 'monthly', priority: '0.7', lastmod },
    ...LOCALE_CODES.filter((code) => translationExists(code, 'therapist', slug)).map((code) => ({
      path: `/${code}/blog/${slug}`,
      changefreq: 'monthly',
      priority: '0.6',
      lastmod,
    })),
  ]),
  ...journalingBlogPosts.flatMap(({ slug, lastmod }) => [
    { path: `/app/blog/${slug}`, changefreq: 'monthly', priority: '0.7', lastmod },
    ...LOCALE_CODES.filter((code) => translationExists(code, 'journaling', slug)).map((code) => ({
      path: `/${code}/app/blog/${slug}`,
      changefreq: 'monthly',
      priority: '0.6',
      lastmod,
    })),
  ]),
];

const localizedStaticRoutes = LOCALE_CODES.flatMap((code) =>
  LOCALIZED_STATIC.map((path) => ({
    path: path === '/' ? `/${code}` : `/${code}${path}`,
    changefreq: 'weekly',
    priority: '0.9',
  }))
);

const allRoutes = [...staticRoutes, ...localizedStaticRoutes, ...blogRoutes];

const urls = allRoutes
  .map(
    ({ path, changefreq, priority, lastmod }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod ?? today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = join(ROOT, 'public/sitemap.xml');
writeFileSync(outPath, xml);
console.log(`Wrote ${allRoutes.length} URLs to ${outPath}`);
console.log(`  ${staticRoutes.length} static + ${therapistBlogPosts.length} therapist blogs + ${journalingBlogPosts.length} journaling blogs`);
