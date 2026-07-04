import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';
import { MESSAGES } from '../constants/index.js';

/**
 * Collect express-validator results. On failure, throw a 422 ApiError with a
 * clean [{ field, message }] list. Register AFTER the validation chains.
 * @type {import('express').RequestHandler}
 */
export const validate = (req, _res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = result.array().map((e) => ({ field: e.path ?? e.param, message: e.msg }));
  return next(ApiError.validation(MESSAGES.VALIDATION_FAILED, errors));
};
