/**
 * Lightweight, dependency-free user-agent parser. Extracts a coarse browser
 * name and device type — enough for contact-notification context. For richer
 * parsing, swap in `ua-parser-js`.
 */

/**
 * Detect the browser name from a user-agent string.
 * Order matters: more specific engines are checked before generic ones.
 * @param {string} ua
 * @returns {string}
 */
const detectBrowser = (ua = '') => {
  if (/edg/i.test(ua)) return 'Edge';
  if (/opr\//i.test(ua) || /opera/i.test(ua)) return 'Opera';
  if (/samsungbrowser/i.test(ua)) return 'Samsung Internet';
  if (/chrome|crios/i.test(ua)) return 'Chrome';
  if (/firefox|fxios/i.test(ua)) return 'Firefox';
  if (/safari/i.test(ua)) return 'Safari';
  if (/msie|trident/i.test(ua)) return 'Internet Explorer';
  return 'Unknown';
};

/**
 * Detect the device type from a user-agent string.
 * @param {string} ua
 * @returns {'Mobile'|'Tablet'|'Desktop'}
 */
const detectDevice = (ua = '') => {
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return 'Tablet';
  if (/mobi|iphone|ipod|android.*mobile|windows phone/i.test(ua)) return 'Mobile';
  return 'Desktop';
};

/**
 * Parse a user-agent into { browser, device }.
 * @param {string} [ua]
 * @returns {{ browser: string, device: string }}
 */
export const parseUserAgent = (ua = '') => ({
  browser: detectBrowser(ua),
  device: detectDevice(ua),
});
