import { BaseRepository } from './base.repository.js';
import { VisitorEvent } from '../models/index.js';

/**
 * Data access for tracked visitor events.
 */
class EventRepository extends BaseRepository {
  constructor() {
    super(VisitorEvent);
  }

  /**
   * Return a visitor's events as a chronological timeline (newest first).
   * @param {string} visitorId
   * @param {number} [limit=200]
   */
  timelineForVisitor(visitorId, limit = 200) {
    return this.findAll({
      where: { visitorId },
      order: [['createdAt', 'DESC']],
      limit,
    });
  }
}

export const eventRepository = new EventRepository();
