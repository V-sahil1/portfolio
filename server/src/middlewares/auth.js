import { verifyToken } from '../utils/jwt.js';
import { ApiError } from '../utils/ApiError.js';
import { MESSAGES } from '../constants/index.js';

/**
 * JWT authentication guard. Verifies the Bearer token and attaches the decoded
 * admin claims to `req.admin`. Throws 401 on any failure.
 * @type {import('express').RequestHandler}
 */
export const authenticate = (req, _res, next) => {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return next(ApiError.unauthorized(MESSAGES.TOKEN_MISSING));
  }

  try {
    const decoded = verifyToken(header.slice(7).trim());
    req.admin = { email: decoded.email, role: decoded.role };
    return next();
  } catch {
    return next(ApiError.unauthorized(MESSAGES.INVALID_TOKEN));
  }
};
