import morgan from 'morgan';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

/**
 * HTTP request logging via Morgan, piped through the app logger.
 * 'dev' format in development, 'combined' in production.
 */
export const requestLogger = morgan(config.isProd ? 'combined' : 'dev', {
  stream: { write: (msg) => logger.info(msg.trim()) },
});
