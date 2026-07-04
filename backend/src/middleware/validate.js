import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';
import { MESSAGES } from '../constants/index.js';

/**
 * Run the express-validator result check. If any validation chain failed,
 * throw a 422 ApiError carrying a clean array of { field, message } errors.
 * Place AFTER the validation chains in a route definition.
 *
 * @type {import('express').RequestHandler}
 */
export const validate = (req, _res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = result.array().map((e) => ({
    field: e.path ?? e.param,
    message: e.msg,
  }));

  return next(ApiError.validation(MESSAGES.VALIDATION_FAILED, errors));
};
