import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

/** Abort a slow geo lookup so it never delays the contact save. */
const FETCH_TIMEOUT_MS = 2500;

/**
 * GeoLocationService — resolves an IP address to { country, city } using a free
 * provider (ip-api.com by default). Best-effort: any failure returns nulls and
 * is logged, never thrown.
 */
class GeoLocationService {
  /**
   * Look up geolocation for an IP.
   * @param {string|null} ip - a public IP (null for local/private → skipped)
   * @returns {Promise<{ country: string|null, city: string|null }>}
   */
  async lookup(ip) {
    const empty = { country: null, city: null };
    if (!config.geo.enabled || !ip) return empty;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      // ip-api.com response fields: { status, country, city, message }
      const url = `${config.geo.apiUrl}/${encodeURIComponent(ip)}?fields=status,message,country,city`;
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`Geo provider HTTP ${res.status}`);

      const data = await res.json();
      if (data.status && data.status !== 'success') {
        throw new Error(`Geo provider: ${data.message || 'lookup failed'}`);
      }

      return { country: data.country || null, city: data.city || null };
    } catch (err) {
      logger.warn(`Geo lookup failed for ${ip}:`, err.message);
      return empty;
    } finally {
      clearTimeout(timer);
    }
  }
}

export const geoLocationService = new GeoLocationService();
