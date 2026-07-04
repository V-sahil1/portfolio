import { contactRepository } from '../repositories/contact.repository.js';
import { cacheService } from './cache.service.js';
import { enqueueContactNotification } from '../queues/email.queue.js';
import { CACHE_PREFIX } from '../constants/index.js';

class ContactService {
  /**
   * Store a contact-form submission and enqueue a notification email to the
   * portfolio owner. Email sending is async (BullMQ) so the request is fast.
   * @param {object} data - validated contact payload
   * @param {string} [ipAddress]
   * @returns {Promise<object>} created contact
   */
  async create(data, ipAddress) {
    const contact = await contactRepository.create({
      visitorId: data.visitorId || null,
      sessionId: data.sessionId || null,
      name: data.name,
      email: data.email,
      company: data.company || null,
      designation: data.designation || null,
      phone: data.phone || null,
      subject: data.subject || null,
      message: data.message,
      ipAddress: data.ipAddress || ipAddress || null,
    });

    // "Whenever someone submits the contact form, send an email to me."
    await enqueueContactNotification(contact.toJSON());

    await cacheService.delByPrefix(CACHE_PREFIX.ANALYTICS);
    return contact;
  }
}

export const contactService = new ContactService();
