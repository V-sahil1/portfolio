/**
 * Worker entrypoint — run with `npm run worker`.
 * Kept as a separate process from the API so email/background work scales and
 * fails independently of request handling.
 */
import { createEmailWorker } from './email.worker.js';
import { verifyMailer } from '../config/mailer.js';
import { disconnectRedis } from '../config/redis.js';
import { logger } from '../utils/logger.js';

const bootstrap = async () => {
  await verifyMailer(); // best-effort; logs on failure
  const workers = [createEmailWorker()];
  logger.info(`Started ${workers.length} BullMQ worker(s).`);

  /** Close workers + Redis cleanly on termination. */
  const shutdown = async (signal) => {
    logger.info(`Worker received ${signal}, shutting down…`);
    await Promise.allSettled(workers.map((w) => w.close()));
    await disconnectRedis();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

bootstrap().catch((err) => {
  logger.error('Worker failed to start:', err);
  process.exit(1);
});
