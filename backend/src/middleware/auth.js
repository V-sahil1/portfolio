import { verifyAccessToken } from '../utils/jwt.js';
import { ApiError } from '../utils/ApiError.js';
import { MESSAGES } from '../constants/index.js';

/**
 * Extract a Bearer token from the Authorization header.
 * @param {import('express').Request} req
 * @returns {string|null}
 */
const extractToken = (req) => {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) return header.slice(7).trim();
  return null;
};

/**
 * Authentication guard — verifies the access token and attaches the decoded
 * admin claims to `req.admin`. Throws 401 on any failure.
 * @type {import('express').RequestHandler}
 */
export const authenticate = (req, _res, next) => {
  const token = extractToken(req);
  if (!token) return next(ApiError.unauthorized(MESSAGES.TOKEN_MISSING));

  try {
    const decoded = verifyAccessToken(token);
    req.admin = { id: decoded.sub, email: decoded.email, role: decoded.role };
    return next();
  } catch {
    return next(ApiError.unauthorized(MESSAGES.INVALID_TOKEN));
  }
};

/**
 * Authorization guard — restrict a route to specific roles. Use AFTER
 * `authenticate`. Example: authorize(ROLES.SUPER_ADMIN).
 * @param {...string} allowedRoles
 * @returns {import('express').RequestHandler}
 */
export const authorize =
  (...allowedRoles) =>
  (req, _res, next) => {
    if (!req.admin) return next(ApiError.unauthorized(MESSAGES.UNAUTHORIZED));
    if (allowedRoles.length && !allowedRoles.includes(req.admin.role)) {
      return next(ApiError.forbidden(MESSAGES.FORBIDDEN));
    }
    return next();
  };
