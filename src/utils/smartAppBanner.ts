import { isTherapistPath } from './therapistRoutes';

/**
 * iOS Safari Smart App Banner (`<meta name="apple-itunes-app">`).
 *
 * The tag ships in index.html so consumer pages get the banner at first
 * paint. Prerendered therapist routes have it stripped at build time
 * (scripts/prerender.mjs); this runtime sync covers the rest: client-side
 * navigation between the two halves of the site and therapist routes that
 * fall through to the SPA shell (localized prefixes, unprerendered paths).
 *
 * Safari reads the tag when the page loads, so toggling it after the fact is
 * best effort on a live page. It is exact for the next load, and it keeps
 * the DOM honest for anything else that inspects the head.
 */
const META_NAME = 'apple-itunes-app';
const META_CONTENT = 'app-id=6472873287';

export function syncSmartAppBanner(basePath: string): void {
  if (typeof document === 'undefined') return;
  const existing = document.head.querySelector<HTMLMetaElement>(`meta[name="${META_NAME}"]`);
  if (isTherapistPath(basePath)) {
    existing?.remove();
    return;
  }
  if (existing) return;
  const meta = document.createElement('meta');
  meta.name = META_NAME;
  meta.content = META_CONTENT;
  document.head.appendChild(meta);
}
