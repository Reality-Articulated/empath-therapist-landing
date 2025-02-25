import { useCallback, useEffect, useState } from 'react';
import { analytics } from '../services/analytics';

/**
 * Custom hook for tracking analytics events
 * Makes it easy to track events with consistent properties
 */
export function useAnalytics() {
  const [sessionStartTime] = useState<number>(Date.now());
  const [lastInteractionTime, setLastInteractionTime] = useState<number>(Date.now());
  
  // Track session duration
  useEffect(() => {
    // Update interaction time on user activity
    const updateInteraction = () => {
      setLastInteractionTime(Date.now());
    };
    
    // Listen for user interactions
    window.addEventListener('click', updateInteraction);
    window.addEventListener('keypress', updateInteraction);
    window.addEventListener('scroll', updateInteraction);
    window.addEventListener('mousemove', updateInteraction);
    
    // Track session start
    analytics.track('Session Start', {
      referrer: document.referrer,
      landing_page: window.location.pathname,
      utm_source: new URLSearchParams(window.location.search).get('utm_source') || 'direct',
      utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || 'none',
      utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || 'none',
    });
    
    // Track session end on unmount
    return () => {
      window.removeEventListener('click', updateInteraction);
      window.removeEventListener('keypress', updateInteraction);
      window.removeEventListener('scroll', updateInteraction);
      window.removeEventListener('mousemove', updateInteraction);
      
      const sessionDurationMs = Date.now() - sessionStartTime;
      const inactiveTimeMs = Date.now() - lastInteractionTime;
      
      analytics.track('Session End', {
        session_duration_seconds: Math.round(sessionDurationMs / 1000),
        inactive_time_seconds: Math.round(inactiveTimeMs / 1000),
        pages_viewed: sessionStorage.getItem('pages_viewed') || '1',
      });
    };
  }, [sessionStartTime]);
  
  // Track page views 
  const trackPageView = useCallback((pageName: string, properties = {}) => {
    // Increment pages viewed counter in session storage
    const pagesViewed = parseInt(sessionStorage.getItem('pages_viewed') || '0', 10) + 1;
    sessionStorage.setItem('pages_viewed', pagesViewed.toString());
    
    // Track the page view
    analytics.trackPageView(pageName, {
      session_duration_seconds: Math.round((Date.now() - sessionStartTime) / 1000),
      ...properties,
    });
  }, [sessionStartTime]);
  
  // Track user interactions
  const trackEvent = useCallback((eventName: string, properties = {}) => {
    analytics.track(eventName, {
      session_duration_seconds: Math.round((Date.now() - sessionStartTime) / 1000),
      ...properties,
    });
  }, [sessionStartTime]);
  
  // Track errors
  const trackError = useCallback((errorType: string, errorMessage: string, properties = {}) => {
    analytics.track('Error Occurred', {
      error_type: errorType,
      error_message: errorMessage,
      ...properties,
    });
  }, []);
  
  // Helper for tracking button clicks
  const trackButtonClick = useCallback((buttonName: string, buttonLocation: string, properties = {}) => {
    analytics.track('Button Click', {
      button_name: buttonName,
      button_location: buttonLocation,
      page: window.location.pathname,
      ...properties,
    });
  }, []);
  
  return {
    trackPageView,
    trackEvent,
    trackError,
    trackButtonClick,
  };
}

export default useAnalytics; 