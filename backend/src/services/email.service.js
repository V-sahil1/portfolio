import { getTransporter } from '../config/mailer.js';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

/** Escape a value for safe inclusion in an HTML email. */
const esc = (value) =>
  String(value ?? '—')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/**
 * Low-level send helper. All notification emails go to the owner's NOTIFY_EMAIL.
 * @param {{ subject: string, html: string, replyTo?: string }} params
 * @returns {Promise<object>} nodemailer info
 */
const sendToOwner = ({ subject, html, replyTo }) => {
  const to = config.mail.notifyEmail;
  if (!to) throw new Error('NOTIFY_EMAIL is not configured.');

  return getTransporter().sendMail({
    from: config.mail.from,
    to,
    subject,
    html,
    replyTo,
  });
};

class EmailService {
  /**
   * Notify the owner of a new contact-form submission.
   * @param {object} contact - stored contact record
   */
  async sendContactNotification(contact) {
    const html = `
      <h2>📬 New contact form submission</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><strong>Name</strong></td><td>${esc(contact.name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${esc(contact.email)}</td></tr>
        <tr><td><strong>Company</strong></td><td>${esc(contact.company)}</td></tr>
        <tr><td><strong>Designation</strong></td><td>${esc(contact.designation)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${esc(contact.phone)}</td></tr>
        <tr><td><strong>Subject</strong></td><td>${esc(contact.subject)}</td></tr>
      </table>
      <p><strong>Message</strong></p>
      <blockquote>${esc(contact.message)}</blockquote>
      <hr/><small>Received at ${esc(contact.createdAt)}</small>
    `;
    const info = await sendToOwner({
      subject: `New contact from ${contact.name}${contact.company ? ` (${contact.company})` : ''}`,
      html,
      replyTo: contact.email,
    });
    logger.info('Contact notification sent:', info.messageId);
    return info;
  }

  /**
   * Notify the owner that a résumé was downloaded.
   * @param {object} payload - { visitorId, sessionId, page, metadata, occurredAt }
   */
  async sendResumeDownloadNotification(payload) {
    const html = `
      <h2>📄 Résumé downloaded</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><strong>Visitor</strong></td><td>${esc(payload.visitorId)}</td></tr>
        <tr><td><strong>Session</strong></td><td>${esc(payload.sessionId)}</td></tr>
        <tr><td><strong>Page</strong></td><td>${esc(payload.page)}</td></tr>
        <tr><td><strong>When</strong></td><td>${esc(payload.occurredAt)}</td></tr>
      </table>
    `;
    const info = await sendToOwner({ subject: 'Your résumé was just downloaded', html });
    logger.info('Resume-download notification sent:', info.messageId);
    return info;
  }

  /**
   * Notify the owner that a recruiter/visitor submitted their details.
   * @param {object} visitor - stored visitor record
   */
  async sendRecruiterNotification(visitor) {
    const html = `
      <h2>🧑‍💼 New visitor details captured</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><strong>Name</strong></td><td>${esc(visitor.name)}</td></tr>
        <tr><td><strong>Designation</strong></td><td>${esc(visitor.designation)}</td></tr>
        <tr><td><strong>Company</strong></td><td>${esc(visitor.company)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${esc(visitor.email)}</td></tr>
        <tr><td><strong>LinkedIn</strong></td><td>${esc(visitor.linkedin)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${esc(visitor.phone)}</td></tr>
      </table>
    `;
    const info = await sendToOwner({
      subject: `New visitor: ${visitor.name || 'Unknown'}${visitor.company ? ` @ ${visitor.company}` : ''}`,
      html,
      replyTo: visitor.email || undefined,
    });
    logger.info('Recruiter notification sent:', info.messageId);
    return info;
  }
}

export const emailService = new EmailService();
