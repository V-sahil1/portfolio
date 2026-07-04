import { createApp } from './app.js';
import { config } from './config/env.js';
import { connectDatabase, sequelize } from './config/database.js';
import { disconnectRedis } from './config/redis.js';
import { startCronJobs, stopCronJobs } from './cron/index.js';
import { closeEmailQueue } from './queues/email.queue.js';
import { logger } from './utils/logger.js';

// Ensure model associations are registered before any query runs.
import './models/index.js';

/**
 * Boot sequence:
 *   1. Verify the database connection (fail fast if down).
 *   2. Start background cron jobs.
 *   3. Start the HTTP server.
 *   4. Register graceful-shutdown handlers.
 */
const start = async () => {
  await connectDatabase();

  const app = createApp();
  const server = app.listen(config.port, () => {
    logger.info(`API listening on http://localhost:${config.port}${config.apiPrefix}`);
    logger.info(`Swagger docs at http://localhost:${config.port}${config.apiPrefix}/docs`);
  });

  startCronJobs();

  /** Close HTTP + DB + Redis + queues in order, then exit. */
  const shutdown = async (signal) => {
    logger.info(`Received ${signal}. Shutting down gracefully…`);
    server.close(async () => {
      stopCronJobs();
      await Promise.allSettled([closeEmailQueue(), sequelize.close(), disconnectRedis()]);
      logger.info('Shutdown complete.');
      process.exit(0);
    });
    // Force-exit if cleanup hangs.
    setTimeout(() => process.exit(1), 10000).unref();
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // Never leave the process in an undefined state on unhandled failures.
  process.on('unhandledRejection', (reason) => logger.error('Unhandled rejection:', reason));
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception:', err);
    process.exit(1);
  });
};

start().catch((err) => {
  logger.error('Fatal: failed to start server:', err);
  process.exit(1);
});
