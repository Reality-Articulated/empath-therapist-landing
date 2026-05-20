import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SITE_URL = 'https://www.empathdash.com';

const today = new Date().toISOString().split('T')[0];

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

function extractSlugs(filePath) {
  const text = readFileSync(filePath, 'utf-8');
  const slugs = [];
  const re = /slug:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

const therapistBlogSlugs = extractSlugs(join(ROOT, 'src/data/blogPosts.ts'));
const journalingBlogSlugs = extractSlugs(join(ROOT, 'src/data/journalingBlogPosts.ts'));

const blogRoutes = [
  ...therapistBlogSlugs.map((slug) => ({
    path: `/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
  ...journalingBlogSlugs.map((slug) => ({
    path: `/app/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
];

const allRoutes = [...staticRoutes, ...blogRoutes];

const urls = allRoutes
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
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
console.log(`  ${staticRoutes.length} static + ${therapistBlogSlugs.length} therapist blogs + ${journalingBlogSlugs.length} journaling blogs`);
