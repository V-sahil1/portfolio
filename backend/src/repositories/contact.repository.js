import { BaseRepository } from './base.repository.js';
import { Contact } from '../models/index.js';

/**
 * Data access for contact-form submissions.
 */
class ContactRepository extends BaseRepository {
  constructor() {
    super(Contact);
  }

  /**
   * Contact history for a specific visitor (newest first).
   * @param {string} visitorId
   */
  historyForVisitor(visitorId) {
    return this.findAll({
      where: { visitorId },
      order: [['createdAt', 'DESC']],
    });
  }
}

export const contactRepository = new ContactRepository();
