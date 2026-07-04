/**
 * Resolve the best-guess client IP address from a request, honouring common
 * proxy headers. Assumes Express `trust proxy` is enabled upstream.
 * @param {import('express').Request} req
 * @returns {string|null}
 */
export const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || null;
};
