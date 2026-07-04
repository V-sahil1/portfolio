import { sessionRepository } from '../repositories/session.repository.js';
import { cacheService } from './cache.service.js';
import { CACHE_PREFIX } from '../constants/index.js';

class SessionService {
  /**
   * Record a visitor session. Idempotent on `sessionId` so a retried client
   * request does not create duplicates. The server-observed IP is used unless
   * the client explicitly provided one.
   * @param {object} data - validated session payload
   * @param {string} [ipAddress] - IP resolved from the request
   * @returns {Promise<{ session: object, created: boolean }>}
   */
  async create(data, ipAddress) {
    const payload = { ...data, ipAddress: data.ipAddress || ipAddress || null };
    const [session, created] = await sessionRepository.findOrCreateBySessionId(payload);

    if (created) {
      // New session changes visit counts → drop cached analytics.
      await cacheService.delByPrefix(CACHE_PREFIX.ANALYTICS);
    }

    return { session, created };
  }
}

export const sessionService = new SessionService();
