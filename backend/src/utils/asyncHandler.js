/**
 * Wrap an async Express handler so rejected promises are forwarded to the
 * global error handler instead of crashing the process. Removes the need for
 * try/catch in every controller.
 *
 * @param {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => Promise<any>} fn
 * @returns {import('express').RequestHandler}
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
