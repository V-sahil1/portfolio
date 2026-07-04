import { Queue } from 'bullmq';
import { bullConnection, defaultJobOptions } from './connection.js';
import { QUEUES, JOBS } from '../constants/index.js';
import { logger } from '../utils/logger.js';

/**
 * Email queue — all outbound email is processed asynchronously so that HTTP
 * requests (e.g. submitting the contact form) return immediately.
 */
export const emailQueue = new Queue(QUEUES.EMAIL, {
  ...bullConnection,
  defaultJobOptions,
});

/**
 * Enqueue a "new contact" notification email to the portfolio owner.
 * @param {object} payload - the stored contact record (plain object)
 * @returns {Promise<import('bullmq').Job>}
 */
export const enqueueContactNotification = (payload) => {
  logger.debug('Enqueue contact notification', { email: payload?.email });
  return emailQueue.add(JOBS.CONTACT_NOTIFICATION, payload);
};

/**
 * Enqueue a notification that a recruiter/visitor downloaded the résumé.
 * @param {object} payload - { visitor, session, event }
 * @returns {Promise<import('bullmq').Job>}
 */
export const enqueueResumeDownloadNotification = (payload) => {
  logger.debug('Enqueue resume download notification');
  return emailQueue.add(JOBS.RESUME_DOWNLOAD_NOTIFICATION, payload);
};

/**
 * Enqueue a notification that a recruiter filled in their details (new visitor).
 * @param {object} payload - the stored visitor record (plain object)
 * @returns {Promise<import('bullmq').Job>}
 */
export const enqueueRecruiterNotification = (payload) => {
  logger.debug('Enqueue recruiter notification', { company: payload?.company });
  return emailQueue.add(JOBS.RECRUITER_NOTIFICATION, payload);
};

/** Close the queue (used on graceful shutdown). */
export const closeEmailQueue = () => emailQueue.close();
