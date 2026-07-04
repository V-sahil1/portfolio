import { ValidationError as SequelizeValidationError, UniqueConstraintError } from 'sequelize';
import { ApiError } from '../utils/ApiError.js';
import { sendError } from '../utils/ApiResponse.js';
import { HTTP_STATUS, MESSAGES } from '../constants/index.js';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

/**
 * 404 handler for unmatched routes. Forwards a NotFound ApiError to the global
 * error handler so the response shape stays consistent.
 * @type {import('express').RequestHandler}
 */
export const notFound = (req, _res, next) =>
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));

/**
 * Normalise any thrown value into an ApiError-like shape.
 * @param {unknown} err
 * @returns {{ statusCode: number, message: string, errors: any[] }}
 */
const normalise = (err) => {
  if (err instanceof ApiError) {
    return { statusCode: err.statusCode, message: err.message, errors: err.errors };
  }

  // Sequelize unique-constraint → 409 Conflict with field details.
  if (err instanceof UniqueConstraintError) {
    return {
      statusCode: HTTP_STATUS.CONFLICT,
      message: 'Resource already exists.',
      errors: err.errors?.map((e) => ({ field: e.path, message: e.message })) ?? [],
    };
  }

  // Sequelize model validation → 422.
  if (err instanceof SequelizeValidationError) {
    return {
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      message: MESSAGES.VALIDATION_FAILED,
      errors: err.errors?.map((e) => ({ field: e.path, message: e.message })) ?? [],
    };
  }

  // JWT errors bubbling up from anywhere.
  if (err?.name === 'JsonWebTokenError' || err?.name === 'TokenExpiredError') {
    return { statusCode: HTTP_STATUS.UNAUTHORIZED, message: MESSAGES.INVALID_TOKEN, errors: [] };
  }

  // Malformed JSON body (from express.json()).
  if (err?.type === 'entity.parse.failed') {
    return { statusCode: HTTP_STATUS.BAD_REQUEST, message: 'Invalid JSON payload.', errors: [] };
  }

  // Fallback: unexpected/unhandled error.
  return {
    statusCode: err?.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err?.message || MESSAGES.INTERNAL_ERROR,
    errors: [],
  };
};

/**
 * Global error handler. Must be registered LAST (after routes). Logs the error
 * and returns the standard error envelope. Internal 5xx messages are masked in
 * production to avoid leaking implementation detail.
 * @type {import('express').ErrorRequestHandler}
 */
// eslint-disable-next-line no-unused-vars -- Express identifies error handlers by arity (4 args).
export const errorHandler = (err, req, res, _next) => {
  const { statusCode, message, errors } = normalise(err);

  if (statusCode >= 500) {
    logger.error(`${req.method} ${req.originalUrl} →`, err?.stack || err);
  } else {
    logger.warn(`${req.method} ${req.originalUrl} → ${statusCode} ${message}`);
  }

  const clientMessage =
    statusCode >= 500 && config.isProd ? MESSAGES.INTERNAL_ERROR : message;

  return sendError(res, { statusCode, message: clientMessage, errors });
};
