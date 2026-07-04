import { Worker } from 'bullmq';
import { bullConnection } from '../queues/connection.js';
import { emailService } from '../services/email.service.js';
import { QUEUES, JOBS } from '../constants/index.js';
import { logger } from '../utils/logger.js';

/**
 * Processor for the email queue. Dispatches each job to the right email
 * builder. Throwing here triggers BullMQ's retry/backoff policy.
 * @param {import('bullmq').Job} job
 */
const processor = async (job) => {
  logger.debug(`Processing email job ${job.id} (${job.name})`);

  switch (job.name) {
    case JOBS.CONTACT_NOTIFICATION:
      return emailService.sendContactNotification(job.data);
    case JOBS.RESUME_DOWNLOAD_NOTIFICATION:
      return emailService.sendResumeDownloadNotification(job.data);
    case JOBS.RECRUITER_NOTIFICATION:
      return emailService.sendRecruiterNotification(job.data);
    default:
      throw new Error(`Unknown email job: ${job.name}`);
  }
};

/**
 * Create and wire the email worker (concurrency 5). The worker is created only
 * when this module is imported by the worker entrypoint, keeping the API and
 * worker processes cleanly separable.
 * @returns {import('bullmq').Worker}
 */
export const createEmailWorker = () => {
  const worker = new Worker(QUEUES.EMAIL, processor, {
    ...bullConnection,
    concurrency: 5,
  });

  worker.on('completed', (job) => logger.info(`Email job ${job.id} completed.`));
  worker.on('failed', (job, err) =>
    logger.error(`Email job ${job?.id} failed:`, err?.message),
  );

  return worker;
};
