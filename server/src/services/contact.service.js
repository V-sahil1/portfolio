import { contactRepository } from '../repositories/contact.repository.js';
import { geoLocationService } from './geolocation.service.js';
import { whatsappService } from './whatsapp.service.js';
import { parseUserAgent } from '../utils/userAgent.js';
import { normaliseIp } from '../utils/request.js';
import { logger } from '../utils/logger.js';

/**
 * ContactService — orchestrates the full contact workflow:
 *   1. Collect visitor info (UA → browser/device, IP → country/city)
 *   2. Store the contact in PostgreSQL
 *   3. Send a WhatsApp notification (best-effort; failure never rolls back)
 */
class ContactService {
  /**
   * Create a contact from a validated form submission + request context.
   * @param {object} input
   * @param {string} input.name
   * @param {string} input.email
   * @param {string} input.message
   * @param {string|null} input.ipAddress - resolved client IP
   * @param {string} input.userAgent - raw UA header
   * @returns {Promise<Contact>} the persisted contact
   */
  async createContact({ name, email, message, ipAddress, userAgent }) {
    // Step 1 — collect visitor info.
    const { browser, device } = parseUserAgent(userAgent);
    const { country, city } = await geoLocationService.lookup(normaliseIp(ipAddress));

    // Step 2 — persist. This is the operation that must succeed.
    const contact = await contactRepository.create({
      name,
      email,
      message,
      ipAddress,
      country,
      city,
      browser,
      device,
      userAgent,
    });

    // Step 3 — notify via WhatsApp (fire-and-forget, fully isolated).
    // We intentionally do NOT await-fail: send() swallows its own errors, but
    // we also guard here so nothing can bubble up and affect the response.
    whatsappService
      .send(contact.toJSON())
      .catch((err) => logger.error('Unexpected WhatsApp error:', err.message));

    return contact;
  }

  /**
   * List contacts (admin), paginated.
   * @param {{ page?: number, limit?: number }} [query]
   * @returns {Promise<{ items: Contact[], meta: object }>}
   */
  async listContacts({ page = 1, limit = 20 } = {}) {
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
    const { rows, count } = await contactRepository.findAndCount({
      limit: safeLimit,
      offset: (safePage - 1) * safeLimit,
    });

    return {
      items: rows,
      meta: {
        total: count,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(count / safeLimit) || 1,
      },
    };
  }
}

export const contactService = new ContactService();
