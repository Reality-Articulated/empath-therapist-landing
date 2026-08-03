import { useLocale } from '../LocaleContext';
import { Locale } from '../locales';
import { journalingEn, JournalingCopy } from './journaling.en';
import { journalingEs } from './journaling.es';
import { journalingPt } from './journaling.pt';
import { journalingHi } from './journaling.hi';
import { journalingDe } from './journaling.de';
import { journalingFr } from './journaling.fr';
import { journalingIt } from './journaling.it';
import { callmeEn, CallMeCopy } from './callme.en';
import { callmeEs } from './callme.es';
import { callmePt } from './callme.pt';
import { callmeHi } from './callme.hi';
import { callmeDe } from './callme.de';
import { callmeFr } from './callme.fr';
import { callmeIt } from './callme.it';

const journalingCatalogs: Record<Locale, JournalingCopy> = {
  en: journalingEn,
  es: journalingEs,
  pt: journalingPt,
  hi: journalingHi,
  de: journalingDe,
  fr: journalingFr,
  it: journalingIt,
};

const callmeCatalogs: Record<Locale, CallMeCopy> = {
  en: callmeEn,
  es: callmeEs,
  pt: callmePt,
  hi: callmeHi,
  de: callmeDe,
  fr: callmeFr,
  it: callmeIt,
};

export function getJournalingCopy(locale: Locale): JournalingCopy {
  return journalingCatalogs[locale] ?? journalingEn;
}

/** The landing page's copy for the current route locale. */
export function useJournalingCopy(): JournalingCopy {
  return getJournalingCopy(useLocale());
}

export function getCallMeCopy(locale: Locale): CallMeCopy {
  return callmeCatalogs[locale] ?? callmeEn;
}

/** The /call-me page's copy for the current route locale. */
export function useCallMeCopy(): CallMeCopy {
  return getCallMeCopy(useLocale());
}
