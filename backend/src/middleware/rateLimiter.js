import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';
import { MESSAGES } from '../constants/index.js';

/** Shared JSON handler so rate-limit responses match the standard error shape. */
const handler = (_req, res) =>
  res.status(429).json({
    success: false,
    message: MESSAGES.TOO_MANY_REQUESTS,
    errors: [],
  });

/**
 * Global API rate limiter — protects all endpoints from abuse.
 */
export const globalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

/**
 * Stricter limiter for sensitive write endpoints (auth login, contact form)
 * to slow brute-force and spam.
 */
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});
