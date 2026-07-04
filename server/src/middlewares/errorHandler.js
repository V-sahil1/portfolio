import { ValidationError as SequelizeValidationError } from 'sequelize';
import { ApiError } from '../utils/ApiError.js';
import { sendError } from '../utils/ApiResponse.js';
import { HTTP_STATUS, MESSAGES } from '../constants/index.js';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

/**
 * 404 handler for unmatched routes.
 * @type {import('express').RequestHandler}
 */
export const notFound = (req, _res, next) =>
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));

/**
 * Normalise any thrown value into { statusCode, message, errors }.
 * @param {unknown} err
 */
const normalise = (err) => {
  if (err instanceof ApiError) {
    return { statusCode: err.statusCode, message: err.message, errors: err.errors };
  }
  if (err instanceof SequelizeValidationError) {
    return {
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      message: MESSAGES.VALIDATION_FAILED,
      errors: err.errors?.map((e) => ({ field: e.path, message: e.message })) ?? [],
    };
  }
  if (err?.name === 'JsonWebTokenError' || err?.name === 'TokenExpiredError') {
    return { statusCode: HTTP_STATUS.UNAUTHORIZED, message: MESSAGES.INVALID_TOKEN, errors: [] };
  }
  if (err?.type === 'entity.parse.failed') {
    return { statusCode: HTTP_STATUS.BAD_REQUEST, message: 'Invalid JSON payload.', errors: [] };
  }
  return {
    statusCode: err?.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err?.message || MESSAGES.INTERNAL_ERROR,
    errors: [],
  };
};

/**
 * Global error handler — must be registered LAST. Logs the error and returns
 * the standard error envelope; masks 5xx detail in production.
 * @type {import('express').ErrorRequestHandler}
 */
// eslint-disable-next-line no-unused-vars -- Express detects error handlers by 4-arg arity.
export const errorHandler = (err, req, res, _next) => {
  const { statusCode, message, errors } = normalise(err);

  if (statusCode >= 500) logger.error(`${req.method} ${req.originalUrl} →`, err?.stack || err);
  else logger.warn(`${req.method} ${req.originalUrl} → ${statusCode} ${message}`);

  const clientMessage = statusCode >= 500 && config.isProd ? MESSAGES.INTERNAL_ERROR : message;
  return sendError(res, { statusCode, message: clientMessage, errors });
};
