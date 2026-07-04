/**
 * Standard success response envelope:
 *   { success: true, message: "", data: {} }
 * Use via `res.success(...)` (installed by the response middleware) or directly.
 */

/**
 * Send a standardised success response.
 * @param {import('express').Response} res
 * @param {object} [options]
 * @param {number} [options.statusCode=200]
 * @param {string} [options.message='Request successful.']
 * @param {*} [options.data=null]
 * @param {object} [options.meta] - optional pagination/extra metadata
 */
export const sendSuccess = (
  res,
  { statusCode = 200, message = 'Request successful.', data = null, meta } = {},
) => {
  const body = { success: true, message, data };
  if (meta) body.meta = meta;
  return res.status(statusCode).json(body);
};

/**
 * Send a standardised error response:
 *   { success: false, message: "", errors: [] }
 * @param {import('express').Response} res
 * @param {object} [options]
 * @param {number} [options.statusCode=500]
 * @param {string} [options.message]
 * @param {Array} [options.errors=[]]
 */
export const sendError = (
  res,
  { statusCode = 500, message = 'Something went wrong.', errors = [] } = {},
) => res.status(statusCode).json({ success: false, message, errors });
