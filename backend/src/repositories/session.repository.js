import { BaseRepository } from './base.repository.js';
import { VisitorSession } from '../models/index.js';

/**
 * Data access for visitor sessions.
 */
class SessionRepository extends BaseRepository {
  constructor() {
    super(VisitorSession);
  }

  /**
   * Look up a session by its client-generated business key.
   * @param {string} sessionId - UUID
   */
  findBySessionId(sessionId) {
    return this.findOne({ sessionId });
  }

  /**
   * Create a session, or return the existing one if the sessionId already
   * exists (idempotent — the client may retry).
   * @param {object} data
   * @returns {Promise<[VisitorSession, boolean]>} [session, created]
   */
  findOrCreateBySessionId(data) {
    return this.model.findOrCreate({
      where: { sessionId: data.sessionId },
      defaults: data,
    });
  }
}

export const sessionRepository = new SessionRepository();
