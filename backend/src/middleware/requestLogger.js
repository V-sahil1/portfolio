import morgan from 'morgan';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

/**
 * Morgan HTTP request logger, piped through the application logger so all
 * output shares one format. Uses concise 'dev' output in development and the
 * more complete 'combined' format in production.
 */
export const requestLogger = morgan(config.isProd ? 'combined' : 'dev', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});
