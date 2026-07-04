/**
 * Barrel export for constants so callers can do:
 *   import { HTTP_STATUS, MESSAGES, EVENT_TYPES } from '../constants/index.js';
 */
export { HTTP_STATUS } from './httpStatus.js';
export { MESSAGES } from './messages.js';
export { EVENT_TYPES, EVENT_TYPE_VALUES, EVENT_TYPE_SET } from './eventTypes.js';
export { CACHE_KEYS, CACHE_PREFIX } from './cacheKeys.js';

/** BullMQ queue + job names. */
export const QUEUES = Object.freeze({
  EMAIL: 'email',
});

export const JOBS = Object.freeze({
  CONTACT_NOTIFICATION: 'contact-notification',
  RESUME_DOWNLOAD_NOTIFICATION: 'resume-download-notification',
  RECRUITER_NOTIFICATION: 'recruiter-notification',
});

/** Admin roles (kept simple; extend for multi-role RBAC). */
export const ROLES = Object.freeze({
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
});
