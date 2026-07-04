import { EventEmitter } from 'node:events';
import { logger } from '../utils/logger.js';

/**
 * Application-wide domain event bus. Lightweight decoupling for side-effects
 * that should not block the request path (analytics, auditing, etc.).
 * Consumers subscribe with appEvents.on(APP_EVENTS.X, handler).
 */
export const appEvents = new EventEmitter();

/** Canonical domain event names. */
export const APP_EVENTS = Object.freeze({
  VISITOR_CREATED: 'visitor.created',
  SESSION_CREATED: 'session.created',
  EVENT_TRACKED: 'event.tracked',
  CONTACT_RECEIVED: 'contact.received',
});

// Surface listener errors instead of letting them crash the process.
appEvents.on('error', (err) => logger.error('appEvents error:', err));
