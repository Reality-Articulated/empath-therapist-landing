import { Link } from 'react-router-dom';
import logo from '../../../public/empath-logo.png';
import { openSupportChat } from '../../utils/supportChat';

const CONTACT_EMAIL = 'div@myempath.co';

/**
 * Footer for the therapist landing page (/therapist), in the consumer
 * homepage's design language. Carries the founder and contact line that
 * therapists and investors look for, plus the credibility pages (Science,
 * Advisory, Transparency Pledge).
 */
export default function TherapistFooter() {
  const linkClass = 'hover:text-stone-900 transition-colors';

  return (
    <footer className="bg-[#FAF9F6] border-t-2 border-stone-200 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block p-4 rounded-lg mb-6">
          <img src={logo} alt="Empath" className="w-8 h-8 object-contain" />
        </div>

        <nav
          className="flex justify-center items-center gap-x-8 gap-y-4 text-stone-500 font-bold text-sm mb-8 uppercase tracking-widest flex-wrap"
          aria-label="Footer"
        >
          <Link to="/science" className={linkClass}>Science</Link>
          <Link to="/advisory" className={linkClass}>Advisory</Link>
          <Link to="/blog" className={linkClass}>Blog</Link>
          <Link to="/whyempath" className={linkClass}>For clients</Link>
          <Link to="/transparency" className={linkClass}>Transparency Pledge</Link>
          <Link to="/pledge" className={linkClass}>Privacy</Link>
          <Link to="/terms" className={linkClass}>Terms</Link>
          <button
            type="button"
            onClick={() => openSupportChat()}
            className={`${linkClass} uppercase tracking-widest font-bold`}
          >
            Support
          </button>
        </nav>

        <p className="text-stone-600 text-sm font-medium mb-2">
          Built by Div Khare, founder. Therapists, practices, and investors can reach him directly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#1b8af1] font-bold hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p className="text-stone-400 text-xs font-medium">
          © {new Date().getFullYear()} Reality Articulated Inc. Client data is encrypted at rest and in transit and never used to train AI models.
        </p>
      </div>
    </footer>
  );
}
