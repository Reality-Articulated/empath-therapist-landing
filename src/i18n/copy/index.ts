import { useLocale } from '../LocaleContext';
import { Locale } from '../locales';
import { journalingEn, JournalingCopy } from './journaling.en';
import { journalingEs } from './journaling.es';
import { journalingPt } from './journaling.pt';
import { journalingHi } from './journaling.hi';
import { journalingDe } from './journaling.de';
import { journalingFr } from './journaling.fr';
import { journalingIt } from './journaling.it';

const catalogs: Record<Locale, JournalingCopy> = {
  en: journalingEn,
  es: journalingEs,
  pt: journalingPt,
  hi: journalingHi,
  de: journalingDe,
  fr: journalingFr,
  it: journalingIt,
};

export function getJournalingCopy(locale: Locale): JournalingCopy {
  return catalogs[locale] ?? journalingEn;
}

/** The landing page's copy for the current route locale. */
export function useJournalingCopy(): JournalingCopy {
  return getJournalingCopy(useLocale());
}
