import { redisConnectionOptions } from '../config/redis.js';

/**
 * Shared BullMQ connection config. BullMQ manages its own ioredis instances
 * internally; we only pass the connection options (never the shared client).
 */
export const bullConnection = { connection: redisConnectionOptions };

/**
 * Default job options applied to every queued job:
 *  - exponential backoff on retry
 *  - keep a bounded history so Redis does not grow unbounded
 */
export const defaultJobOptions = {
  attempts: 3,
  backoff: { type: 'exponential', delay: 5000 },
  removeOnComplete: { count: 100 },
  removeOnFail: { count: 200 },
};
