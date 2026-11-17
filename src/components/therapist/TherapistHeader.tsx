import { Link } from 'react-router-dom';
import posthog from 'posthog-js';
import logo from '../../../public/empath-logo.png';

const DASHBOARD_URL = 'https://app.empathdash.com/';

/**
 * Sticky header for the therapist landing page (/therapist). The page renders
 * its own chrome (it is in App.tsx's `hideNavbar` list) so it can share the
 * consumer homepage's design language instead of the shared slate Navbar, and
 * so "Start free" stays one tap away at every scroll position.
 */
export default function TherapistHeader() {
  const linkClass = 'text-sm font-bold text-stone-600 hover:text-[#1b8af1] transition-colors hidden lg:block';

  return (
    <div className="bg-[#FAF9F6]/90 backdrop-blur-sm border-b-2 border-stone-200 py-4 sticky top-0 z-40">
      <div className="container mx-auto px-4 flex justify-between items-center gap-4">
        <Link to="/" className="flex items-center gap-0" aria-label="Empath home">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={logo} alt="" className="w-full h-full object-contain" />
          </div>
          <span className="text-stone-900 tracking-tight text-lg">Empath</span>
          <span className="ml-2 hidden sm:inline-block px-2 py-0.5 bg-stone-100 text-stone-600 text-[11px] font-bold uppercase tracking-wider rounded">
            For therapists
          </span>
        </Link>

        <nav className="flex items-center gap-5 md:gap-7" aria-label="Therapist page">
          <a href="#how-it-works" className={linkClass}>How it works</a>
          <a href="#pricing" className={linkClass}>Pricing</a>
          <a href="#faq" className={linkClass}>FAQ</a>
          <Link to="/science" className={linkClass}>Science</Link>
          <Link to="/advisory" className={linkClass}>Advisory</Link>
          <Link to="/blog" className={linkClass}>Blog</Link>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-stone-600 hover:text-[#1b8af1] transition-colors"
            aria-label="Sign in to the Empath dashboard"
          >
            Sign in
          </a>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture('therapist_cta_clicked', { cta: 'start_free', location: 'header' })}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg font-bold text-sm hover:bg-[#1b8af1] transition-colors border-2 border-stone-900 whitespace-nowrap"
          >
            Start free
          </a>
        </nav>
      </div>
    </div>
  );
}
