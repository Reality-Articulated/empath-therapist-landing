import type { CaptureResult } from 'posthog-js';

/**
 * Google Ads conversion tracking.
 *
 * The base Google tag (`gtag.js`, account AW-18370013671) is loaded in
 * `index.html`, which gives Google Ads page views and remarketing audiences.
 * This module fires the *conversion* events on top of it.
 *
 * ── How conversions are wired ─────────────────────────────────────────────
 * Rather than sprinkling `gtag('event', 'conversion', …)` next to every CTA,
 * `googleAdsBeforeSend` is registered as a PostHog `before_send` hook in
 * `main.tsx`. Every PostHog event already emitted by the site passes through
 * it, and the ones that match `POSTHOG_EVENT_TO_CONVERSION` below also fire
 * the corresponding Google Ads conversion. ANALYTICS_EVENTS.md therefore
 * doubles as the list of conversion trigger points, and a new CTA surface
 * that follows the existing event naming (`<surface>_app_store_clicked`,
 * `channel_link_clicked`, …) is tracked automatically.
 *
 * Conversions with no PostHog counterpart (or where the PostHog event fires
 * before validation) call `trackGoogleAdsConversion` directly.
 *
 * ── Labels ────────────────────────────────────────────────────────────────
 * Each conversion action created in Google Ads (Goals → Conversions → New →
 * Website → "Add a conversion action manually") gets a conversion label —
 * the part after the slash in the event snippet's `send_to:
 * 'AW-18370013671/AbCdEfGhIj'`. Paste it into `CONVERSION_LABELS`. A
 * conversion whose label is still empty is skipped (and logged in dev), so
 * partially configured tracking never breaks the site.
 *
 * Google Ads only ever sees the conversion name, an optional value and the
 * click-time identifiers gtag.js manages itself. No PII is sent from here.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GOOGLE_ADS_ID = 'AW-18370013671';

export type GoogleAdsConversion =
  /** Tap on any "Download on the App Store" CTA (all surfaces). */
  | 'app_store_click'
  /** Tap on a WhatsApp / Telegram / Messenger / Instagram "journal on…" link. */
  | 'channel_link_click'
  /** Tap on a `tel:` link to call the Empath number. */
  | 'call_click'
  /** "Empath calls you" form accepted by the server (immediate or scheduled). */
  | 'call_me_placed'
  /** Premium upgrade page → checkout (RC web billing or App Store). */
  | 'upgrade_checkout'
  /** Therapist-funnel lead: client invite / marketplace connection submitted. */
  | 'therapist_lead';

/**
 * Conversion label per action, from the Google Ads UI. Empty string = not yet
 * created in Google Ads → the conversion is skipped.
 */
export const CONVERSION_LABELS: Record<GoogleAdsConversion, string> = {
  app_store_click: '',
  channel_link_click: '',
  call_click: '',
  call_me_placed: '',
  upgrade_checkout: '',
  therapist_lead: '',
};

/**
 * PostHog event → Google Ads conversion. Exact names first, then regexes for
 * the per-surface families (`journaling_page_app_store_clicked`,
 * `floating_cta_call_clicked`, `journaling_page_call_me_placed`, …).
 * `channel_link_clicked` is the cross-surface event `captureChannelLinkClick`
 * emits alongside the legacy `<surface>_<channel>_clicked`; only the former
 * is mapped so one tap = one conversion.
 */
const EXACT_EVENT_MAP: Record<string, GoogleAdsConversion> = {
  channel_link_clicked: 'channel_link_click',
  upgrade_checkout_clicked: 'upgrade_checkout',
};

const PATTERN_EVENT_MAP: Array<[RegExp, GoogleAdsConversion]> = [
  [/app_store_clicked$/, 'app_store_click'],
  [/_call_clicked$/, 'call_click'],
  [/call_me_(?:call_)?placed$/, 'call_me_placed'],
];

export function conversionForPostHogEvent(eventName: string): GoogleAdsConversion | null {
  if (EXACT_EVENT_MAP[eventName]) return EXACT_EVENT_MAP[eventName];
  const hit = PATTERN_EVENT_MAP.find(([re]) => re.test(eventName));
  return hit ? hit[1] : null;
}

export interface ConversionOptions {
  /** Monetary value of the conversion (e.g. plan price). */
  value?: number;
  /** ISO 4217, defaults to USD when `value` is given. */
  currency?: string;
  /** Lets Google Ads dedupe repeat hits for the same real-world conversion. */
  transactionId?: string;
}

/** Sends one Google Ads conversion. No-op when the label isn't configured. */
export function trackGoogleAdsConversion(
  name: GoogleAdsConversion,
  options: ConversionOptions = {},
): boolean {
  const label = CONVERSION_LABELS[name];
  const payload: Record<string, unknown> = { send_to: `${GOOGLE_ADS_ID}/${label}` };
  if (options.value !== undefined) {
    payload.value = options.value;
    payload.currency = options.currency ?? 'USD';
  }
  if (options.transactionId) payload.transaction_id = options.transactionId;

  if (!label) {
    if (import.meta.env.DEV) {
      console.debug(`[googleAds] "${name}" would fire but has no conversion label yet`, payload);
    }
    return false;
  }
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return false;
  if (import.meta.env.DEV) {
    console.debug(`[googleAds] conversion "${name}"`, payload);
  }
  window.gtag('event', 'conversion', payload);
  return true;
}

/**
 * PostHog `before_send` hook: mirrors mapped events to Google Ads and always
 * returns the event untouched so PostHog capture is never affected.
 */
export function googleAdsBeforeSend(event: CaptureResult | null): CaptureResult | null {
  if (!event) return event;
  try {
    const conversion = conversionForPostHogEvent(event.event);
    if (conversion) trackGoogleAdsConversion(conversion);
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[googleAds] before_send failed', err);
  }
  return event;
}

/**
 * Google click identifiers. Captured off the landing URL alongside `utm_*`
 * (see App.tsx) and registered as PostHog super properties, so a later
 * `channel_link_clicked` → server-side `channel_first_message` join can be
 * exported and uploaded to Google Ads as an offline conversion.
 */
export const GOOGLE_CLICK_ID_PARAMS = ['gclid', 'gbraid', 'wbraid'] as const;
