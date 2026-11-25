import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import posthog from 'posthog-js';
import logo from '../../../public/empath-logo.png';
import EarlyAccessModal from './EarlyAccessModal';

const DASHBOARD_URL = 'https://app.empathdash.com/';

/**
 * Sticky header for the therapist landing page (/therapist) and the therapist
 * blog (/blog, /blog/:slug). Those pages render their own chrome (they are in
 * App.tsx's `hideNavbar` list) so they can share the consumer homepage's
 * design language instead of the shared slate Navbar, and so "Get early access"
 * stays one tap away at every scroll position.
 *
 * The section links are absolute (`/therapist#pricing`) so they also work
 * from the blog. On /therapist itself the browser treats them as same-page
 * fragment jumps. Arriving from another page is a fresh load, where App.tsx
 * scrolls to the top after mount, so the effect below re-applies the hash on
 * the next frame.
 */
export default function TherapistHeader() {
  const linkClass = 'text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors hidden lg:block';
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // The modal is a sibling of the header bar, not a child: the bar's
  // backdrop-blur would otherwise confine a fixed-position overlay to the bar.
  return (
    <>
    <div className="bg-[#FAF9F6]/85 backdrop-blur-md border-b border-stone-200/70 py-3.5 sticky top-0 z-40">
      <div className="container mx-auto px-4 flex justify-between items-center gap-4">
        <Link to="/" className="flex items-center gap-0" aria-label="Empath home">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={logo} alt="" className="w-full h-full object-contain" />
          </div>
          <span className="text-stone-900 tracking-tight text-lg">Empath</span>
          <span className="ml-2 hidden sm:inline-block px-2.5 py-0.5 bg-blue-50 text-[#1b8af1] text-[11px] font-semibold uppercase tracking-[0.14em] rounded-full">
            For therapists
          </span>
        </Link>

        <nav className="flex items-center gap-5 md:gap-7" aria-label="Therapist page">
          <a href="/therapist#how-it-works" className={linkClass}>How it works</a>
          <a href="/therapist#pricing" className={linkClass}>Pricing</a>
          <a href="/therapist#faq" className={linkClass}>FAQ</a>
          <Link to="/science" className={linkClass}>Science</Link>
          <Link to="/advisory" className={linkClass}>Advisory</Link>
          <Link to="/blog" className={linkClass}>Blog</Link>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            aria-label="Sign in to the Empath dashboard"
          >
            Sign in
          </a>
          <button
            type="button"
            onClick={() => {
              posthog.capture('therapist_cta_clicked', { cta: 'early_access', location: 'header' });
              setShowEarlyAccess(true);
            }}
            className="px-5 py-2 bg-stone-900 text-white rounded-full font-semibold text-sm hover:bg-[#1b8af1] transition-colors whitespace-nowrap cursor-pointer"
          >
            Get early access
          </button>
        </nav>
      </div>
    </div>
    <EarlyAccessModal open={showEarlyAccess} onClose={() => setShowEarlyAccess(false)} location="header" />
    </>
  );
}
