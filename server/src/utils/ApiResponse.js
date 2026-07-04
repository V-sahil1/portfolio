/**
 * Standard response envelopes.
 * Success: { success: true, message, data }
 * Error:   { success: false, message, errors }
 */

/**
 * Send a success response.
 * @param {import('express').Response} res
 * @param {{ statusCode?: number, message?: string, data?: * }} [opts]
 */
export const sendSuccess = (res, { statusCode = 200, message = 'Success', data = null } = {}) =>
  res.status(statusCode).json({ success: true, message, data });

/**
 * Send an error response.
 * @param {import('express').Response} res
 * @param {{ statusCode?: number, message?: string, errors?: Array }} [opts]
 */
export const sendError = (res, { statusCode = 500, message = 'Error', errors = [] } = {}) =>
  res.status(statusCode).json({ success: false, message, errors });
