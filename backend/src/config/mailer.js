import nodemailer from 'nodemailer';
import { config } from './env.js';
import { logger } from '../utils/logger.js';

/**
 * Shared Nodemailer transport built from SMTP env vars. Created lazily so the
 * API can boot even if SMTP is not configured (jobs will fail and retry).
 */
let transporter = null;

/**
 * Get (or lazily create) the SMTP transporter.
 * @returns {import('nodemailer').Transporter}
 */
export const getTransporter = () => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: config.mail.secure, // true for 465, false for 587/STARTTLS
    auth: config.mail.user
      ? { user: config.mail.user, pass: config.mail.password }
      : undefined,
  });

  return transporter;
};

/**
 * Verify the SMTP connection (used by the worker at startup). Logs but does not
 * throw, so a misconfigured mailer degrades gracefully.
 * @returns {Promise<boolean>}
 */
export const verifyMailer = async () => {
  try {
    await getTransporter().verify();
    logger.info('SMTP transport verified.');
    return true;
  } catch (err) {
    logger.warn('SMTP verification failed (emails may not send):', err.message);
    return false;
  }
};
