/**
 * Human-readable response messages. Centralised for consistency and easy i18n.
 */
export const MESSAGES = Object.freeze({
  // Generic
  SUCCESS: 'Request successful.',
  CREATED: 'Resource created successfully.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_FAILED: 'Validation failed.',
  INTERNAL_ERROR: 'Something went wrong. Please try again later.',
  TOO_MANY_REQUESTS: 'Too many requests. Please slow down.',

  // Auth
  LOGIN_SUCCESS: 'Logged in successfully.',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  TOKEN_REFRESHED: 'Access token refreshed.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  UNAUTHORIZED: 'Authentication required.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  INVALID_TOKEN: 'Invalid or expired token.',
  TOKEN_MISSING: 'Authorization token is missing.',

  // Domain
  VISITOR_CREATED: 'Visitor recorded successfully.',
  SESSION_CREATED: 'Session recorded successfully.',
  EVENT_TRACKED: 'Event tracked successfully.',
  CONTACT_RECEIVED: 'Your message has been received. Thank you!',
  DASHBOARD_OK: 'Dashboard analytics fetched successfully.',
  VISITORS_OK: 'Visitors fetched successfully.',
  VISITOR_OK: 'Visitor profile fetched successfully.',
  ANALYTICS_OK: 'Analytics fetched successfully.',
});
