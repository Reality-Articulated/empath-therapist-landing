// Runtime loader for machine-translated blog posts.
//
// scripts/translate-content.mjs writes one JSON per post per locale to
//   src/data/i18n/<locale>/<kind>/<slug>.json   (kind: journaling | therapist)
// holding the post's translated text fields. This hook lazily loads the JSON
// for the current route locale and merges it over the English post object;
// when no translation exists (or locale is en) the English post is returned
// unchanged. Prerender + sitemap discover the same files at build time, so
// dropping a JSON in is all it takes to light a localized blog URL up.
import { useEffect, useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';

// Lazy glob: nothing is bundled until a translated post is actually viewed.
const translationModules = import.meta.glob('./*/*/*.json');

export function useTranslatedPost<T extends { slug: string }>(
  post: T | undefined,
  kind: 'journaling' | 'therapist',
): T | undefined {
  const locale = useLocale();
  const [merged, setMerged] = useState<T | undefined>(post);

  useEffect(() => {
    setMerged(post);
    if (!post || locale === 'en') return;
    const loader = translationModules[`./${locale}/${kind}/${post.slug}.json`];
    if (!loader) return;
    let cancelled = false;
    loader()
      .then((mod) => {
        const translation = (mod as { default?: Partial<T> }).default ?? (mod as Partial<T>);
        if (!cancelled) setMerged({ ...post, ...translation, slug: post.slug });
      })
      .catch(() => {
        /* keep English on any load failure */
      });
    return () => {
      cancelled = true;
    };
  }, [post, locale, kind]);

  return merged;
}
