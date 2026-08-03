import { Helmet } from 'react-helmet-async';
import { useLocale } from '../i18n/LocaleContext';
import { LOCALE_META, localePath, TRANSLATED_LOCALE_CODES } from '../i18n/locales';

const SITE_URL = 'https://www.empathdash.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/empath-logo.png`;

interface SEOProps {
  title: string;
  description: string;
  /** Locale-free path ("/app"); the locale prefix is added automatically. */
  path: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  keywords?: string;
  /**
   * Set true on pages whose copy is actually localized (title/description
   * passed in the route's language). Emits the hreflang cluster and a
   * locale-prefixed canonical. Untranslated pages keep an English canonical
   * even when rendered under /es/… so duplicates never get indexed.
   */
  translated?: boolean;
}

export default function SEO({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  keywords,
  translated = false,
}: SEOProps) {
  const locale = useLocale();
  const canonical = `${SITE_URL}${translated ? localePath(locale, path) : path}`;
  const htmlLang = translated ? LOCALE_META[locale].htmlLang : 'en';
  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {translated && (
        <>
          <link rel="alternate" hrefLang="en" href={`${SITE_URL}${path}`} />
          {TRANSLATED_LOCALE_CODES.map((code) => (
            <link
              key={code}
              rel="alternate"
              hrefLang={LOCALE_META[code].hreflang}
              href={`${SITE_URL}${localePath(code, path)}`}
            />
          ))}
          <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />
        </>
      )}

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Helmet>
  );
}
