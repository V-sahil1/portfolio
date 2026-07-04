/**
 * Wrap an async route handler so rejected promises flow to the global error
 * handler — removes repetitive try/catch from controllers.
 * @param {import('express').RequestHandler} fn
 * @returns {import('express').RequestHandler}
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
