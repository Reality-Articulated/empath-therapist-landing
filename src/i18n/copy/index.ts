import { journalingEn, JournalingCopy } from './journaling.en';
import { callmeEn, CallMeCopy } from './callme.en';

export function getJournalingCopy(): JournalingCopy {
  return journalingEn;
}

/** The landing page's copy. */
export function useJournalingCopy(): JournalingCopy {
  return journalingEn;
}

export function getCallMeCopy(): CallMeCopy {
  return callmeEn;
}

/** The /call-me page's copy. */
export function useCallMeCopy(): CallMeCopy {
  return callmeEn;
}
