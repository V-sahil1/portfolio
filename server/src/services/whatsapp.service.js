import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { formatDateTime } from '../utils/datetime.js';

const FETCH_TIMEOUT_MS = 8000;

/**
 * WhatsappService — builds the notification message and sends it via the
 * WhatsApp Business Cloud API (Meta Graph API). Designed to be non-blocking to
 * the contact save: send() never throws; it returns a result object instead.
 */
class WhatsappService {
  /**
   * Build the formatted WhatsApp message body from a contact record.
   * @param {object} contact - { name, email, message, country, city, browser, device, createdAt }
   * @returns {string}
   */
  buildMessage(contact) {
    const time = formatDateTime(contact.createdAt ? new Date(contact.createdAt) : new Date());
    return [
      '🔥 New Portfolio Contact',
      '',
      `👤 Name: ${contact.name}`,
      `📧 Email: ${contact.email}`,
      '',
      '💬 Message:',
      contact.message,
      '',
      `🌍 Country: ${contact.country || 'Unknown'}`,
      `🏙 City: ${contact.city || 'Unknown'}`,
      `💻 Browser: ${contact.browser || 'Unknown'}`,
      `📱 Device: ${contact.device || 'Unknown'}`,
      '',
      '🕒 Time:',
      time,
    ].join('\n');
  }

  /**
   * Build the Graph API request body for the configured message type.
   * @param {string} text - the composed message
   * @returns {object}
   */
  #buildPayload(text) {
    const base = { messaging_product: 'whatsapp', to: config.whatsapp.to };

    if (config.whatsapp.messageType === 'template') {
      // Business-initiated messages require an approved template. The template
      // must define one body parameter that receives the full text.
      return {
        ...base,
        type: 'template',
        template: {
          name: config.whatsapp.templateName,
          language: { code: config.whatsapp.templateLang },
          components: [{ type: 'body', parameters: [{ type: 'text', text }] }],
        },
      };
    }

    // Free-form text (only delivered inside a 24h customer-service window).
    return { ...base, type: 'text', text: { preview_url: false, body: text } };
  }

  /**
   * Send the WhatsApp notification for a contact. Never throws.
   * @param {object} contact
   * @returns {Promise<{ ok: boolean, skipped?: boolean, id?: string, error?: string }>}
   */
  async send(contact) {
    if (!config.whatsapp.enabled) {
      logger.info('WhatsApp disabled; skipping notification.');
      return { ok: false, skipped: true };
    }
    if (!config.whatsapp.phoneNumberId || !config.whatsapp.accessToken || !config.whatsapp.to) {
      logger.warn('WhatsApp not fully configured; skipping notification.');
      return { ok: false, skipped: true };
    }

    const text = this.buildMessage(contact);
    const url = `https://graph.facebook.com/${config.whatsapp.apiVersion}/${config.whatsapp.phoneNumberId}/messages`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.whatsapp.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.#buildPayload(text)),
        signal: controller.signal,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detail = data?.error?.message || `HTTP ${res.status}`;
        throw new Error(detail);
      }

      const id = data?.messages?.[0]?.id;
      logger.info('WhatsApp notification sent.', { id });
      return { ok: true, id };
    } catch (err) {
      // Per spec: log the error, do NOT fail the request / rollback the DB.
      logger.error('WhatsApp send failed:', err.message);
      return { ok: false, error: err.message };
    } finally {
      clearTimeout(timer);
    }
  }
}

export const whatsappService = new WhatsappService();
