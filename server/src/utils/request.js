/**
 * Resolve the client IP from a request, honouring the X-Forwarded-For header
 * set by proxies/load balancers. Assumes Express `trust proxy` is enabled.
 * @param {import('express').Request} req
 * @returns {string|null}
 */
export const getClientIp = (req) => {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return req.ip || req.socket?.remoteAddress || null;
};

/**
 * Normalise a possibly IPv6-mapped/loopback IP for geolocation lookups.
 * Returns null for local/private addresses (no meaningful geo).
 * @param {string|null} ip
 * @returns {string|null}
 */
export const normaliseIp = (ip) => {
  if (!ip) return null;
  let clean = ip.replace(/^::ffff:/, ''); // IPv4-mapped IPv6
  if (clean === '::1' || clean === '127.0.0.1') return null;
  if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(clean)) return null; // private ranges
  return clean;
};
