/**
 * Channel availability switches for the marketing site.
 *
 * SMS journaling is paused (2026-08-04): inbound + outbound Twilio SMS legs
 * were the dominant line on the bill, so the site no longer offers texting as
 * a way to journal. Call, WhatsApp, Telegram, Messenger, Instagram and the app
 * are untouched.
 *
 * To unpause: flip this to `true` — every `sms:` CTA comes back. The prose that
 * named SMS as a channel was edited in place across `src/i18n/copy/*`, so
 * `git log -- src/i18n/copy` is the restore path for the wording. The
 * `hero.text` / `hero.textToJournal` / `hero.textUsAt` / `floating.text` labels
 * were deliberately left in all seven catalogs so only prose needs reverting.
 */
export const SMS_ENABLED = false;
