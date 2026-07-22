import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SITE_URL = 'https://www.empathdash.com';

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

// Each post's `date:` field precedes its `slug:` field, so the nearest date
// found in the window before a slug is that post's publish date. Using the
// real date as <lastmod> (instead of the build date for every URL) keeps the
// signal credible — Google ignores lastmod when it changes on every deploy.
function extractPosts(filePath) {
  const text = readFileSync(filePath, 'utf-8');
  const posts = [];
  const slugRe = /slug:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = slugRe.exec(text)) !== null) {
    const before = text.slice(Math.max(0, match.index - 2000), match.index);
    const dates = [...before.matchAll(/date:\s*['"]([^'"]+)['"]/g)];
    const rawDate = dates.length ? dates[dates.length - 1][1] : '';
    posts.push({
      slug: match[1],
      lastmod: rawDate ? toIsoDate(rawDate) : today,
    });
  }
  return posts;
}

const therapistBlogPosts = extractPosts(join(ROOT, 'src/data/blogPosts.ts'));
const journalingBlogPosts = [
  ...extractPosts(join(ROOT, 'src/data/kinzerJournalingBlogPosts.ts')),
  ...extractPosts(join(ROOT, 'src/data/journalingBlogPosts.ts')),
];

const blogRoutes = [
  ...therapistBlogPosts.map(({ slug, lastmod }) => ({
    path: `/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod,
  })),
  ...journalingBlogPosts.map(({ slug, lastmod }) => ({
    path: `/app/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod,
  })),
];

const allRoutes = [...staticRoutes, ...blogRoutes];

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
