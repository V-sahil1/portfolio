import { HTTP_STATUS } from '../constants/httpStatus.js';

/**
 * Application-level error carrying an HTTP status and an optional list of
 * granular error details (used for validation errors). The global error
 * handler recognises `isOperational` to decide what to expose to clients.
 */
export class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message - human-readable message
   * @param {Array} [errors] - detailed error list (e.g. field validation)
   * @param {boolean} [isOperational] - expected/handled error vs a bug
   */
  constructor(statusCode, message, errors = [], isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }

  /** 400 Bad Request. */
  static badRequest(message = 'Bad request', errors = []) {
    return new ApiError(HTTP_STATUS.BAD_REQUEST, message, errors);
  }

  /** 401 Unauthorized. */
  static unauthorized(message = 'Unauthorized') {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED, message);
  }

  /** 403 Forbidden. */
  static forbidden(message = 'Forbidden') {
    return new ApiError(HTTP_STATUS.FORBIDDEN, message);
  }

  /** 404 Not Found. */
  static notFound(message = 'Not found') {
    return new ApiError(HTTP_STATUS.NOT_FOUND, message);
  }

  /** 409 Conflict. */
  static conflict(message = 'Conflict') {
    return new ApiError(HTTP_STATUS.CONFLICT, message);
  }

  /** 422 Unprocessable Entity (validation). */
  static validation(message = 'Validation failed', errors = []) {
    return new ApiError(HTTP_STATUS.UNPROCESSABLE_ENTITY, message, errors);
  }
}
