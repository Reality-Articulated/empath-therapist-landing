# Empath Therapist Landing — Agent Instructions

Marketing landing page for therapists.

## Tech Stack

- **Vite + React 18 + TypeScript + Tailwind**
- Framer Motion for animations
- PostHog + Vercel Analytics for tracking
- Deployed on **Vercel**

## Key Rules

- Performance-first — images optimized via `sharp` + `vite-plugin-image-optimizer`
- Run `npm run optimize-images` before committing new images
- Use `react-intersection-observer` for scroll animations
- PostHog for tracking signups and engagement

## Development

```bash
npm run dev              # Vite dev server
npm run build            # Production build
npm run optimize-images  # Compress images
```
