// Reddit Impression Tracking Endpoint
// This endpoint receives impression tracking events from Reddit Ads
// and logs them to PostHog for attribution analysis

import { PostHog } from 'posthog-node';

const posthogApiKey = process.env.VITE_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.VITE_PUBLIC_POSTHOG_HOST;

let posthog: PostHog | null = null;

if (posthogApiKey) {
  posthog = new PostHog(posthogApiKey, {
    host: posthogHost || 'https://app.posthog.com',
  });
}

export default async function handler(req: any, res: any) {
  // Support both GET and POST for maximum compatibility with Reddit
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract parameters from query string or body
    const params = req.method === 'GET' ? req.query : { ...req.query, ...req.body };
    
    const {
      reddit_ad_id,
      reddit_campaign_id,
      reddit_adgroup_id,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      user_agent,
      ip,
      ...additionalParams
    } = params;

    // Generate a unique ID for this impression event
    const impressionId = `reddit_impression_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const eventProperties = {
      event_type: 'impression',
      reddit_ad_id,
      reddit_campaign_id,
      reddit_adgroup_id,
      utm_source: utm_source || 'reddit',
      utm_medium: utm_medium || 'cpc',
      utm_campaign,
      utm_content,
      utm_term,
      timestamp: new Date().toISOString(),
      user_agent: user_agent || req.headers['user-agent'],
      ip: ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress,
      ...additionalParams,
    };

    // Log to PostHog if configured
    if (posthog) {
      posthog.capture({
        distinctId: impressionId,
        event: 'reddit_ad_impression',
        properties: eventProperties,
      });
      
      await posthog.shutdown();
    }

    // Return 1x1 transparent pixel (standard for tracking pixels)
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // 1x1 transparent GIF
    const pixel = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    );
    
    return res.status(200).send(pixel);
  } catch (error) {
    console.error('Error in reddit-impression handler:', error);
    
    // Still return a pixel even on error to avoid breaking the ad
    res.setHeader('Content-Type', 'image/gif');
    const pixel = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    );
    return res.status(200).send(pixel);
  }
}
