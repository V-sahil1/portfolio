import { createApp } from './app.js';
import { config } from './config/env.js';
import { connectDatabase, sequelize } from './config/database.js';
import { logger } from './utils/logger.js';

// Ensure the model is registered before any query runs.
import './models/index.js';

/**
 * Boot: verify DB connection → start HTTP server → register graceful shutdown.
 */
const start = async () => {
  await connectDatabase();

  const app = createApp();
  const server = app.listen(config.port, () => {
    logger.info(`API listening on http://localhost:${config.port}${config.apiPrefix}`);
    logger.info(`Swagger docs at http://localhost:${config.port}${config.apiPrefix}/docs`);
  });

  /** Close HTTP + DB cleanly, then exit. */
  const shutdown = (signal) => {
    logger.info(`Received ${signal}. Shutting down…`);
    server.close(async () => {
      await sequelize.close().catch(() => {});
      logger.info('Shutdown complete.');
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000).unref();
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
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
