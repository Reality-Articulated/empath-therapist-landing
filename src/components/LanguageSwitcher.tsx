import { Globe } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import posthog from 'posthog-js';
import { useLocale } from '../i18n/LocaleContext';
import { LOCALE_META, Locale, localePath, stripLocalePrefix, TRANSLATED_LOCALE_CODES } from '../i18n/locales';

/**
 * Compact locale dropdown. Navigates to the same page under the chosen
 * locale prefix (English = bare path). Only render this on pages that are
 * actually translated — an untranslated page under /es/ shows English.
 */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const switchTo = (next: Locale) => {
    const { path } = stripLocalePrefix(location.pathname);
    posthog.capture('language_switched', { from: locale, to: next });
    navigate(localePath(next, path) + location.search, { preventScrollReset: true });
  };

  return (
    <label className={`relative inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer ${className}`}>
      <Globe className="w-4 h-4 shrink-0" aria-hidden="true" />
      <select
        aria-label="Language"
        value={locale}
        onChange={(e) => switchTo(e.target.value as Locale)}
        className="appearance-none bg-transparent text-sm font-bold cursor-pointer focus:outline-none pr-1"
      >
        <option value="en">{LOCALE_META.en.label}</option>
        {TRANSLATED_LOCALE_CODES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_META[code].label}
          </option>
        ))}
      </select>
    </label>
  );
}
