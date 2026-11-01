/**
 * Locale-free paths that belong to the therapist-facing side of the site.
 *
 * Single source of truth shared by `src/App.tsx` (runtime: iOS Smart App
 * Banner on/off per route) and `scripts/prerender.mjs` (build: strips the
 * banner meta from the prerendered HTML of these routes). Keep this module
 * free of imports so the prerender script can transpile-load it on its own.
 *
 * Therapists work in the dashboard on a laptop; the consumer iOS app is the
 * wrong thing to advertise to them, and the banner steals the top of the
 * viewport on a phone.
 */
export const THERAPIST_PATHS = [
  '/therapist',
  '/advisory',
  '/science',
  '/calculator',
  '/calculator-direct',
  '/quiz',
  '/blog',
  '/blogs',
] as const;

/** `basePath` must already have its locale prefix stripped ("/therapist", not "/es/therapist"). */
export function isTherapistPath(basePath: string): boolean {
  const path = basePath.replace(/\/+$/, '') || '/';
  return (THERAPIST_PATHS as readonly string[]).includes(path) || path.startsWith('/blog/');
}
