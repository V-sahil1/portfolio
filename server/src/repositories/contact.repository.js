import { Contact } from '../models/index.js';

/**
 * ContactRepository — the only place that talks to the Contact model directly.
 * Keeps persistence concerns out of the service layer.
 */
class ContactRepository {
  /**
   * Insert a new contact row.
   * @param {object} data - { name, email, message, ipAddress, country, city, browser, device, userAgent }
   * @returns {Promise<Contact>}
   */
  create(data) {
    return Contact.create(data);
  }

  /**
   * Fetch contacts newest-first with pagination.
   * @param {{ limit?: number, offset?: number }} [opts]
   * @returns {Promise<{ rows: Contact[], count: number }>}
   */
  findAndCount({ limit = 20, offset = 0 } = {}) {
    return Contact.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });
  }

  /**
   * Fetch a single contact by id.
   * @param {string} id
   * @returns {Promise<Contact|null>}
   */
  findById(id) {
    return Contact.findByPk(id);
  }
}

export const contactRepository = new ContactRepository();
