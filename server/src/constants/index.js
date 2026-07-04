/**
 * Canonical HTTP status codes.
 */
export const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
});

/**
 * Human-readable response messages.
 */
export const MESSAGES = Object.freeze({
  CONTACT_SAVED: 'Contact saved successfully.',
  VALIDATION_FAILED: 'Validation failed.',
  CONTACTS_OK: 'Contacts fetched successfully.',
  LOGIN_SUCCESS: 'Logged in successfully.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  UNAUTHORIZED: 'Authentication required.',
  INVALID_TOKEN: 'Invalid or expired token.',
  TOKEN_MISSING: 'Authorization token is missing.',
  NOT_FOUND: 'Resource not found.',
  TOO_MANY_REQUESTS: 'Too many requests. Please slow down.',
  INTERNAL_ERROR: 'Something went wrong. Please try again later.',
});
