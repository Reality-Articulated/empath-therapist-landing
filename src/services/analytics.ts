import mixpanel from 'mixpanel-browser';

// Replace with your actual Mixpanel project token
const MIXPANEL_TOKEN = 'd500272fae7f1159aec2eba4100de545';

// Environment detection to avoid tracking in development
// Using window.location instead of process.env
const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname.includes('.local');

// Unique identifiers for session tracking
let distinctId: string | null = null;

/**
 * Analytics service for tracking user behavior with Mixpanel
 */
class AnalyticsService {
  /**
   * Initialize Mixpanel with the project token
   */
  init(): void {
    // Initialize Mixpanel
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: isDevelopment,
      track_pageview: true,
      persistence: 'localStorage',
      ip: false,  // Respect privacy by not tracking IP
    });

    // Generate or retrieve a distinct ID for anonymous users
    this.ensureDistinctId();

    // Log initialization in development
    if (isDevelopment) {
      console.log('Analytics initialized with distinct ID:', distinctId);
    }
  }

  /**
   * Ensure we have a distinct ID for anonymous users
   */
  private ensureDistinctId(): void {
    // Try to get existing ID from localStorage
    distinctId = localStorage.getItem('mp_distinct_id');

    // If not found, generate a new one
    if (!distinctId) {
      distinctId = `anon-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('mp_distinct_id', distinctId);
    }

    // Set this as the distinct ID for this user
    mixpanel.identify(distinctId);
  }

  /**
   * Track a user event
   * @param eventName - The name of the event
   * @param properties - Optional properties to attach to the event
   */
  track(eventName: string, properties: Record<string, any> = {}): void {
    try {
      // Add debug flag for internal testing
      const isInternalUser = this.isInternalUser();
      
      // Add session info to all events
      const enhancedProps = {
        ...properties,
        is_internal_user: isInternalUser,
        distinct_id: distinctId,
        referrer: document.referrer,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      };
      
      // Skip tracking for internal users in production
      if (isInternalUser && !isDevelopment) {
        if (isDevelopment) {
          console.log(`[INTERNAL USER] Would track event: ${eventName}`, enhancedProps);
        }
        return;
      }

      // Track the event
      mixpanel.track(eventName, enhancedProps);
      
      // Log in development
      if (isDevelopment) {
        console.log(`Tracked event: ${eventName}`, enhancedProps);
      }
    } catch (error) {
      // Silently fail in production, log in development
      if (isDevelopment) {
        console.error('Analytics error:', error);
      }
    }
  }

  /**
   * Track a page view event
   * @param pageName - The name of the page
   * @param properties - Optional properties for the page view
   */
  trackPageView(pageName: string, properties: Record<string, any> = {}): void {
    this.track('Page View', {
      page_name: pageName,
      ...properties
    });
  }

  /**
   * Register a logged-in user
   * @param userId - The unique identifier for the user
   * @param userProperties - User properties to register
   */
  identifyUser(userId: string, userProperties: Record<string, any> = {}): void {
    try {
      // Update our distinct ID
      distinctId = userId;
      mixpanel.identify(userId);
      
      // Register user properties
      mixpanel.people.set({
        $name: userProperties.name,
        $email: userProperties.email,
        ...userProperties,
        $last_login: new Date(),
      });
      
      if (isDevelopment) {
        console.log(`Identified user: ${userId}`, userProperties);
      }
    } catch (error) {
      if (isDevelopment) {
        console.error('Error identifying user:', error);
      }
    }
  }

  /**
   * Reset the user identification (e.g., on logout)
   */
  reset(): void {
    mixpanel.reset();
    this.ensureDistinctId();
  }

  /**
   * Check if current user is an internal team member
   * This helps filter out internal testing data
   */
  private isInternalUser(): boolean {
    // Check for known internal emails, domains, or debugging flags
    const internalEmails = ['yourteam@example.com', 'dev@example.com'];
    const userEmail = localStorage.getItem('user_email') || '';
    
    // Check local storage for debugging flag
    const isDebugging = localStorage.getItem('debug_mode') === 'true';
    
    return (
      isDebugging ||
      internalEmails.some(email => userEmail.includes(email)) ||
      // Check for development or localhost
      window.location.hostname.includes('localhost') ||
      window.location.hostname.includes('127.0.0.1')
    );
  }

  /**
   * Set a super property that will be sent with all future events
   */
  setSuperProperty(name: string, value: any): void {
    mixpanel.register({ [name]: value });
  }
}

// Export a singleton instance
export const analytics = new AnalyticsService();

// Export default for direct import
export default analytics; 