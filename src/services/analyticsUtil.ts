/**
 * Utilities for working with Mixpanel data
 * These are especially useful for debugging and filtering
 */

/**
 * Enable debug mode for analytics - this adds a flag to local storage
 * that the analytics service will check to identify internal users
 */
export function enableAnalyticsDebugMode(): void {
  localStorage.setItem('debug_mode', 'true');
  console.log('Analytics debug mode enabled. Your sessions will be tagged as internal user.');
}

/**
 * Disable debug mode for analytics - this removes the debug flag
 */
export function disableAnalyticsDebugMode(): void {
  localStorage.removeItem('debug_mode');
  console.log('Analytics debug mode disabled. Your sessions will NOT be tagged as internal user.');
}

/**
 * Check if debug mode is currently enabled
 */
export function isAnalyticsDebugModeEnabled(): boolean {
  return localStorage.getItem('debug_mode') === 'true';
}

/**
 * Clear all analytics-related data from local storage
 * Useful for testing the first-time user experience
 */
export function clearAnalyticsData(): void {
  // Clear Mixpanel-specific items
  Object.keys(localStorage)
    .filter(key => key.startsWith('mp_'))
    .forEach(key => localStorage.removeItem(key));
  
  // Clear our custom distinct ID
  localStorage.removeItem('mp_distinct_id');
  
  // Clear session storage data
  sessionStorage.removeItem('pages_viewed');
  
  console.log('All analytics data has been cleared from local storage.');
}

/**
 * Get the current distinct ID being used by Mixpanel
 * Useful for debugging specific user sessions in Mixpanel
 */
export function getCurrentDistinctId(): string | null {
  return localStorage.getItem('mp_distinct_id');
}

/**
 * Copy the current distinct ID to clipboard
 * Useful when needing to find your own session in Mixpanel
 */
export function copyDistinctIdToClipboard(): void {
  const distinctId = getCurrentDistinctId();
  if (distinctId) {
    navigator.clipboard.writeText(distinctId)
      .then(() => {
        console.log('Distinct ID copied to clipboard:', distinctId);
      })
      .catch(err => {
        console.error('Failed to copy distinct ID:', err);
      });
  } else {
    console.log('No distinct ID found in localStorage');
  }
}

/**
 * Set a test user email for easier identification in Mixpanel
 * @param email The email to set
 */
export function setTestUserEmail(email: string): void {
  localStorage.setItem('user_email', email);
  console.log(`Test user email set to: ${email}`);
}

/**
 * Check if current user is considered an internal team member
 * This helps filter out internal testing data
 */
export function isInternalUser(): boolean {
  // Check for known internal emails, domains, or debugging flags
  const internalEmails = ['yourteam@example.com', 'dev@example.com'];
  const userEmail = localStorage.getItem('user_email') || '';
  
  // Check local storage for debugging flag
  const isDebugging = localStorage.getItem('debug_mode') === 'true';
  
  return (
    isDebugging ||
    internalEmails.some(email => userEmail.includes(email)) ||
    window.location.hostname.includes('localhost') ||
    window.location.hostname.includes('127.0.0.1')
  );
}

// Export a utility for console access
export const AnalyticsDebug = {
  enableDebugMode: enableAnalyticsDebugMode,
  disableDebugMode: disableAnalyticsDebugMode,
  isDebugModeEnabled: isAnalyticsDebugModeEnabled,
  clearData: clearAnalyticsData,
  getDistinctId: getCurrentDistinctId,
  copyDistinctId: copyDistinctIdToClipboard,
  setTestEmail: setTestUserEmail,
  isInternalUser: isInternalUser
}; 