# Reddit Ads Tracking Setup

This project includes server-side tracking endpoints for Reddit Ads click and impression tracking.

## Tracking Endpoints

### Click Tracking URL
```
https://www.empathdash.com/api/reddit-click
```

### Impression Tracking URL
```
https://www.empathdash.com/api/reddit-impression
```

## Setup in Reddit Ads Dashboard

1. **Navigate to your Reddit Ad Campaign**
2. **Go to the Tracking section**
3. **Add the following URLs:**

   - **Click Tracker:** `https://www.empathdash.com/api/reddit-click?reddit_ad_id={{ad_id}}&reddit_campaign_id={{campaign_id}}&reddit_adgroup_id={{adgroup_id}}&utm_campaign={{campaign_name}}`
   
   - **Impression Tracker:** `https://www.empathdash.com/api/reddit-impression?reddit_ad_id={{ad_id}}&reddit_campaign_id={{campaign_id}}&reddit_adgroup_id={{adgroup_id}}&utm_campaign={{campaign_name}}`

   > **Note:** Reddit will automatically replace `{{ad_id}}`, `{{campaign_id}}`, `{{adgroup_id}}`, and `{{campaign_name}}` with actual values.

## What Gets Tracked

Both endpoints capture the following information to PostHog:

- **Reddit-specific parameters:**
  - `reddit_ad_id` - Unique identifier for the ad
  - `reddit_campaign_id` - Campaign identifier
  - `reddit_adgroup_id` - Ad group identifier

- **UTM parameters:**
  - `utm_source` (defaults to 'reddit')
  - `utm_medium` (defaults to 'cpc')
  - `utm_campaign`
  - `utm_content`
  - `utm_term`

- **Metadata:**
  - Timestamp
  - User agent
  - IP address (for geographic analysis)

## PostHog Events

- **Click events:** Logged as `reddit_ad_click`
- **Impression events:** Logged as `reddit_ad_impression`

## Environment Variables Required

Make sure these are set in your Vercel dashboard:

```
VITE_PUBLIC_POSTHOG_KEY=your_posthog_key
VITE_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## Verifying Tracking

1. After deploying, test the URLs directly:
   ```
   curl "https://www.empathdash.com/api/reddit-click?reddit_ad_id=test123"
   ```

2. Check PostHog dashboard for `reddit_ad_click` and `reddit_ad_impression` events

3. In Reddit Ads, the tracking pixels will automatically fire when:
   - An ad is shown (impression)
   - An ad is clicked (click)

## Attribution Flow

1. User sees Reddit ad → Impression tracked
2. User clicks ad → Click tracked
3. User lands on site with UTM parameters → App.tsx captures parameters
4. User actions on site → All events include Reddit attribution data

The parameters captured by these endpoints are also registered as super properties in the frontend (App.tsx), so all subsequent user actions will be attributed to the Reddit ad campaign.
