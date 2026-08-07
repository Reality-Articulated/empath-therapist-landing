import posthog from 'posthog-js';

// Session-scoped ref code embedded in every outbound channel link so
// empath-heroku can join the web session to the conversation it starts:
//   WhatsApp  → appended to the ?text= prefill as " #CODE" (stripped server-side)
//   Telegram  → ?start=CODE (arrives as a /start payload)
//   Messenger → ?ref=CODE   (arrives in the referral webhook field)
//   Instagram → ?ref=CODE
// The server strips/parses the code from the first inbound message and fires
// a `channel_first_message` PostHog event carrying the same code, which this
// side already attached to the click events (plus UTM super properties).
// No O/0/I/1 in the alphabet: the WhatsApp code is user-visible and may get
// retyped by hand.

const STORAGE_KEY = 'empath_channel_ref';
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function getChannelRefCode(): string {
  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }
    sessionStorage.setItem(STORAGE_KEY, code);
    return code;
  } catch {
    // sessionStorage unavailable (private mode edge cases): still tag the
    // link so server-side channel attribution works, just not session-joined.
    return 'NOSESS';
  }
}

/** `Q`-suffixed variant used inside QR codes, so a scan is distinguishable
 * from a tap on the same session's links. */
export function getQrRefCode(): string {
  return `${getChannelRefCode()}Q`;
}

export const CHANNEL_PARTS = {
  whatsappNumber: '18883663082',
  telegramUsername: 'MyEmpathBot',
  messengerPage: '359987860540277', // Empath: Private Journal
  instagramUsername: 'myempath',
};

export function buildChannelHref(
  channel: 'whatsapp' | 'telegram' | 'messenger' | 'instagram',
  prefillText: string,
  code: string,
  parts: typeof CHANNEL_PARTS = CHANNEL_PARTS
): string {
  switch (channel) {
    case 'whatsapp':
      return `https://wa.me/${parts.whatsappNumber}?text=${encodeURIComponent(`${prefillText} #${code}`)}`;
    case 'telegram':
      return `https://t.me/${parts.telegramUsername}?start=${code}`;
    case 'messenger':
      return `https://m.me/${parts.messengerPage}?ref=${code}`;
    case 'instagram':
      return `https://ig.me/m/${parts.instagramUsername}?ref=${code}`;
  }
}

/**
 * Canonical channel-CTA click capture: keeps the legacy per-surface event
 * name (`<prefix>_<channel>_clicked`) that existing dashboards chart, and
 * adds a single `channel_link_clicked` event for cross-surface funnels.
 */
export function captureChannelLinkClick(eventPrefix: string, channel: string, code: string) {
  const props = { channel, ref_code: code };
  posthog.capture(`${eventPrefix}_${channel}_clicked`, props);
  posthog.capture('channel_link_clicked', { ...props, surface: eventPrefix });
}
