# Google Ads Conversion Tracking

How Google Ads learns what visitors do on empathdash.com, and what still has
to be done in the Google Ads UI before any conversion is counted.

## What is already on the site

- **Base Google tag** (`gtag.js`, account `AW-18370013671`) in `index.html`.
  Fires on every page, gives Google Ads page views + remarketing audiences.
- **Conversion events** in `src/utils/googleAds.ts`, sent as
  `gtag('event', 'conversion', { send_to: 'AW-18370013671/<label>' })`.
- **Google click IDs** (`gclid`, `gbraid`, `wbraid`) captured off the landing
  URL in `src/App.tsx` and registered as PostHog super properties, next to the
  UTM and Reddit params. They ride on `channel_link_clicked` and every other
  event for that visitor, which is what a later offline-conversion upload
  needs.

### How conversions are triggered

Not by per-button `gtag` calls. `googleAdsBeforeSend` is a PostHog
`before_send` hook (registered in `src/main.tsx`) that sees every PostHog
event the site captures and fires the matching Google Ads conversion. The
mapping lives in one place, `src/utils/googleAds.ts`:

| Google Ads conversion | PostHog trigger | Surfaces today |
| --- | --- | --- |
| `app_store_click` | any event ending in `app_store_clicked` | `/`, `/app`, try-it demo, blog index + posts, `/call-me`, `/whyempath` |
| `channel_link_click` | `channel_link_clicked` (the cross-surface event from `captureChannelLinkClick`) | WhatsApp / Telegram / Messenger / Instagram buttons everywhere |
| `call_click` | any event ending in `_call_clicked` | every `tel:` CTA |
| `call_me_placed` | `call_me_call_placed`, `journaling_page_call_me_placed` | "Empath calls you" form once the server accepted the request |
| `upgrade_checkout` | `upgrade_checkout_clicked` | `/upgrade` |
| `therapist_lead` | explicit `trackGoogleAdsConversion('therapist_lead')` call | `/whyempath` invite form, both submit branches (next to the Twitter pixel) |

A new CTA that follows the existing PostHog naming is tracked automatically.
Anything that should convert but has no PostHog event (or whose PostHog
event fires before validation) calls `trackGoogleAdsConversion` directly.

The legacy per-surface channel events (`journaling_page_whatsapp_clicked`,
…) are deliberately NOT mapped: `captureChannelLinkClick` fires them together
with `channel_link_clicked`, so mapping both would double count.

## One-time setup in Google Ads (not done yet)

Until this is done every conversion is a silent no-op: `CONVERSION_LABELS`
in `src/utils/googleAds.ts` is empty and the helper skips unlabeled actions.

1. Google Ads → **Goals → Conversions → Summary → + New conversion action →
   Website**. Enter `empathdash.com`, then scroll past the suggestions to
   **"Add a conversion action manually"**.
2. Create one action per row below. Under "Tag setup" choose **"Use Google
   tag"** → "Set up with code"; the event snippet contains
   `send_to: 'AW-18370013671/XXXXXXXXXX'`. The part after the slash is the
   label.

   | Action name in Google Ads | Category | Goal | Count | Suggested value |
   | --- | --- | --- | --- | --- |
   | Channel link click | Contact | **Primary** | One | none |
   | Empath calls you – placed | Submit lead form | **Primary** | One | none |
   | App Store click | Other | **Primary** | One | none |
   | Call click | Phone call lead | Secondary | One | none |
   | Upgrade checkout click | Begin checkout | Secondary | One | none |
   | Therapist lead | Submit lead form | Secondary (or primary for therapist campaigns) | One | none |

   "Count: One" is what dedupes a visitor tapping WhatsApp three times; the
   site does not dedupe client-side on purpose so Tag Assistant shows every hit.
   Leave "Enhanced conversions" off: the site sends no email or phone to Google.
3. Paste each label into `CONVERSION_LABELS` in `src/utils/googleAds.ts`,
   commit, push. Vercel deploys `main`.
4. Verify with the **Google Tag Assistant** Chrome extension on
   https://www.empathdash.com: tap a WhatsApp button and confirm a
   `conversion` hit with the right `send_to`. In Google Ads the action moves
   from "Inactive" to "Recording conversions" within a few hours of the first hit.

In `npm run dev` the helper only logs what it would send (`[googleAds] …`
in the console) and nothing reaches Google.

## Purchases are not web events

Subscriptions are bought in the iOS app (StoreKit via RevenueCat) or through
RevenueCat web billing links, never on this site, so the web tag cannot see
them. The source of truth is the RevenueCat webhook in empath-heroku
(`services/revenuecat/entitlements.js`), which now emits a server-side
PostHog `subscription_purchased` event per first purchase.

Getting those purchases *into Google Ads* as offline conversions needs the
click's `gclid` on the purchase event, which means carrying it across
identities:

- Messaging channels: feasible. The channel link already carries the session
  ref code that empath-heroku joins on the first inbound message
  (`services/channelAttribution.js`). Add a click-time POST of
  `{ ref_code, gclid }` from the site, store the gclid on the user at first
  message, attach it to the purchase event. Then enable PostHog's
  experimental **Google Ads** destination filtered to purchase events with a
  `gclid` (uploads via the Google Ads API, 6–48h delay, needs a conversion
  action set to accept offline data).
- "Empath calls you": feasible the same way, the phone number is sent with
  the request.
- App Store installs: not feasible for web campaigns. Apple does not pass a
  gclid through the App Store; only App campaigns (SKAdNetwork) attribute
  installs. `app_store_click` stays a proxy.

Purchase volume is small, so even once wired this is reporting rather than
something Smart Bidding can learn from. Bid on the primary proxies above.

## Consent note

The site is served in EU locales and has no consent banner; Google's
Consent Mode is not implemented. Revisit before running ads targeted at the
EEA or UK.
