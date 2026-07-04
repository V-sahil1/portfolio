import { HTTP_STATUS } from '../constants/index.js';

/**
 * Operational application error carrying an HTTP status and optional detail
 * list (used for validation). Recognised by the global error handler.
 */
export class ApiError extends Error {
  /**
   * @param {number} statusCode
   * @param {string} message
   * @param {Array} [errors] - granular error details
   */
  constructor(statusCode, message, errors = []) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  /** 400 */
  static badRequest(msg = 'Bad request', errors = []) {
    return new ApiError(HTTP_STATUS.BAD_REQUEST, msg, errors);
  }

  /** 401 */
  static unauthorized(msg = 'Unauthorized') {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED, msg);
  }

  /** 404 */
  static notFound(msg = 'Not found') {
    return new ApiError(HTTP_STATUS.NOT_FOUND, msg);
  }

  /** 422 */
  static validation(msg = 'Validation failed', errors = []) {
    return new ApiError(HTTP_STATUS.UNPROCESSABLE_ENTITY, msg, errors);
  }
}
