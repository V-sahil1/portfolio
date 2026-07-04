import IORedis from 'ioredis';
import { config } from './env.js';
import { logger } from '../utils/logger.js';

/**
 * Connection options shared by the cache client and by BullMQ.
 * `maxRetriesPerRequest: null` is required by BullMQ workers.
 */
export const redisConnectionOptions = {
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  username: config.redis.username,
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
};

/**
 * General-purpose Redis client used for analytics/dashboard caching.
 * Lazily connects; connection errors are logged rather than thrown so that a
 * transient cache outage never takes the API down (cache is best-effort).
 */
export const redisClient = new IORedis({
  ...redisConnectionOptions,
  lazyConnect: false,
});

redisClient.on('connect', () => logger.info('Redis connection established.'));
redisClient.on('error', (err) => logger.error('Redis error:', err.message));

/**
 * Gracefully close the Redis connection (used on shutdown).
 * @returns {Promise<void>}
 */
export const disconnectRedis = async () => {
  try {
    await redisClient.quit();
  } catch (err) {
    logger.warn('Error while closing Redis:', err.message);
  }
};
