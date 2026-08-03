// Locale registry for the localized marketing site.
// URL scheme: English lives at the bare path (/app), every other locale gets
// a path prefix (/es/app, /pt/app, …). Adding a language = one entry here +
// catalog files in src/i18n/copy/ (+ generated blog data via
// scripts/translate-content.mjs).

export const TRANSLATED_LOCALES = {
  es: { hreflang: 'es', htmlLang: 'es', label: 'Español' },
  pt: { hreflang: 'pt-BR', htmlLang: 'pt-BR', label: 'Português' },
  hi: { hreflang: 'hi', htmlLang: 'hi', label: 'हिन्दी' },
  de: { hreflang: 'de', htmlLang: 'de', label: 'Deutsch' },
  fr: { hreflang: 'fr', htmlLang: 'fr', label: 'Français' },
  it: { hreflang: 'it', htmlLang: 'it', label: 'Italiano' },
} as const;

export type TranslatedLocale = keyof typeof TRANSLATED_LOCALES;
export type Locale = TranslatedLocale | 'en';

export const TRANSLATED_LOCALE_CODES = Object.keys(TRANSLATED_LOCALES) as TranslatedLocale[];

export const LOCALE_META: Record<Locale, { hreflang: string; htmlLang: string; label: string }> = {
  en: { hreflang: 'en', htmlLang: 'en', label: 'English' },
  ...TRANSLATED_LOCALES,
};

export function isTranslatedLocale(code: string): code is TranslatedLocale {
  return code in TRANSLATED_LOCALES;
}

/** Prefix a site path with the locale (`/es/app`); English keeps the bare path. */
export function localePath(locale: Locale, path: string): string {
  if (locale === 'en') return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/** Split a pathname into its locale and the locale-free path. */
export function stripLocalePrefix(pathname: string): { locale: Locale; path: string } {
  const match = /^\/([a-z]{2})(\/.*)?$/.exec(pathname);
  if (match && isTranslatedLocale(match[1])) {
    return { locale: match[1], path: match[2] || '/' };
  }
  return { locale: 'en', path: pathname };
}
