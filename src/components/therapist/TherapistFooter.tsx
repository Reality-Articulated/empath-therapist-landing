import { Link } from 'react-router-dom';
import logo from '../../../public/empath-logo.png';
import { openSupportChat } from '../../utils/supportChat';

const CONTACT_EMAIL = 'div@myempath.co';

/**
 * Footer for the therapist landing page (/therapist) and the therapist blog, in the consumer
 * homepage's design language. Carries the founder and contact line that
 * therapists and investors look for, plus the credibility pages (Science,
 * Advisory, Transparency Pledge).
 */
export default function TherapistFooter() {
  const linkClass = 'hover:text-stone-900 transition-colors';

  return (
    <footer className="bg-[#FAF9F6] border-t border-stone-200 py-14">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-0 mb-7">
          <img src={logo} alt="" className="w-9 h-9 object-contain" />
          <span className="text-lg tracking-tight text-stone-900">Empath</span>
        </div>

        <nav
          className="flex justify-center items-center gap-x-8 gap-y-3 text-stone-500 font-medium text-sm mb-8 flex-wrap"
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
            className={`${linkClass} font-medium`}
          >
            Support
          </button>
        </nav>

        <p className="text-stone-600 text-sm mb-2">
          Built by Div Khare, founder. Therapists, practices, and investors can reach him directly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#1b8af1] font-semibold hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p className="text-stone-400 text-xs">
          © {new Date().getFullYear()} Reality Articulated Inc. Client data is encrypted at rest and in transit and never used to train AI models.
        </p>
      </div>
    </footer>
  );
}
