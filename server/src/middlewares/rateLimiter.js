import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';
import { MESSAGES } from '../constants/index.js';

/** JSON handler matching the standard error envelope. */
const handler = (_req, res) =>
  res.status(429).json({ success: false, message: MESSAGES.TOO_MANY_REQUESTS, errors: [] });

/**
 * Global limiter applied to the whole API.
 */
export const globalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

/**
 * Stricter limiter for the public contact endpoint (spam/abuse protection).
 */
export const contactLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.contactMax,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});
