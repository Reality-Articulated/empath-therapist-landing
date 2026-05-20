# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing site for Empath, deployed on Vercel as `https://www.empathdash.com`. A single Vite + React 18 + TypeScript SPA serves two audiences from one codebase:

- **Consumer / journaling app funnel** — `/`, `/app`, `/whyempath`, `/about-atman`, `/quiz`, `/app/blog/*`
- **Therapist-facing marketing** — `/therapist`, `/advisory`, `/science`, `/calculator`, `/blog/*`

`/atman/*` and `/about-atman` proxy a separate app (`https://atman-gamma.vercel.app/`) via an iframe wrapper (`AtmanPage`).

## Commands

```bash
npm run dev              # Vite dev server (HMR overlay enabled)
npm run build            # Runs prebuild (sitemap gen) then `vite build`
npm run lint             # ESLint on the repo
npm run preview          # Preview production build
npm run optimize-images  # One-off: regenerate public/optimized/*.webp via sharp
npm run generate-sitemap # Regenerate public/sitemap.xml without a full build
```

There is no test runner configured.

## Architecture notes that span multiple files

### Routing + chrome visibility

`src/App.tsx` defines all routes against `react-router-dom`'s `BrowserRouter` (set up in `src/main.tsx`). Note the asymmetric path-to-page mapping:

- `/` → `JournalingPage` (consumer landing, **not** the therapist page)
- `/therapist` → `HomePage` (therapist landing)
- `/atman/*` → iframe of the external Atman app

The Navbar and Footer are conditionally hidden by a `hideNavbar` predicate in `App.tsx` for routes that render their own chrome (`/atman*`, `/app*`, `/`, `/about-atman`, `/whyempath`, `/quiz`). When adding a page that doesn't want the shared chrome, update that predicate.

`vercel.json` rewrites **all** paths to `/index.html` so deep links work on Vercel; without it, only `/` resolves on hard refresh.

### Analytics + attribution

PostHog is initialized in `src/main.tsx` (toolbar forcibly disabled in prod) and `App.tsx` is the central place where:

1. UTM + Reddit ad parameters (`utm_*`, `reddit_ad_id`, `reddit_campaign_id`, `reddit_adgroup_id`) are pulled off `location.search` on every route change.
2. Those params are registered as PostHog **super properties** (`posthog.register`) so all downstream events inherit the ad attribution.
3. `$pageview` is captured manually per route — don't rely on PostHog's autocapture pageview because the SPA wouldn't fire it on client-side navigation.

Add new ad-network params to the arrays in `App.tsx` so they flow into super properties consistently. See `REDDIT_TRACKING.md` for the full Reddit pixel setup.

### Serverless functions (`/api`)

Plain Vercel Node handlers (no framework). Each one is the deployed endpoint at `/api/<filename>`:

- `client-lead.ts` — POST endpoint that writes lead form submissions to Airtable. Requires `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME`. Degrades silently if Airtable env vars are missing.
- `reddit-click.ts` / `reddit-impression.ts` — Tracking-pixel endpoints called by Reddit Ads. They forward to PostHog server-side via `posthog-node` and **always return a 1×1 GIF**, even on error, so they never break ad delivery. Uses `VITE_PUBLIC_POSTHOG_KEY` / `VITE_PUBLIC_POSTHOG_HOST` (same key as the client — note the `VITE_PUBLIC_` prefix is a quirk, these are read from `process.env` on the server).

### Sitemap is generated, not hand-written

`scripts/generate-sitemap.mjs` runs in `prebuild` and writes `public/sitemap.xml`. Static routes are listed inline in the script; blog routes are derived by regex-scraping `slug:` literals out of `src/data/blogPosts.ts` and `src/data/journalingBlogPosts.ts`. If you add a new top-level route, add it to `staticRoutes` in the script — the build won't fail without it, but the new page won't be indexed.

### SEO meta tags

`src/components/SEO.tsx` is the single source of truth for `<title>`, canonical URLs, OG, and Twitter cards via `react-helmet-async`. `SITE_URL` is hard-coded to `https://www.empathdash.com` inside the component. Every page should render `<SEO ... />` with a `path` prop matching its route so canonical URLs stay correct.

### Image pipeline

Two complementary stages:

1. **One-off** — `npm run optimize-images` (sharp) converts the explicit list in `scripts/optimize-images.js` into `public/optimized/*.webp`. Add new entries here when adding hero / marketing images that need WebP versions you reference manually in JSX.
2. **Build-time** — `ViteImageOptimizer` in `vite.config.ts` compresses *all* PNG/JPG/SVG/WebP that flow through the Vite bundle.

`vite.config.ts` also defines manual chunks (`vendor`, `animations`, `ui`) — keep heavy libraries in the right bucket if you add new top-level deps, or the chunking gets noisy.

## Conventions

- Use `lucide-react` for icons and Tailwind for styling. The Bolt template prompt (`.bolt/prompt`) explicitly discourages adding alternative UI/icon libraries.
- Scroll animations: `react-intersection-observer`. Motion: `framer-motion`. Both are already in the `animations` chunk.
- Toasts: `react-hot-toast`.
