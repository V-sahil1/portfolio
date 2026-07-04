import { redisClient } from '../config/redis.js';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

/**
 * Best-effort Redis caching helper. Every method swallows Redis errors and
 * degrades gracefully — a cache outage must never break an API request.
 */
class CacheService {
  /**
   * Read and JSON-parse a cached value.
   * @param {string} key
   * @returns {Promise<any|null>} parsed value or null on miss/error
   */
  async get(key) {
    try {
      const raw = await redisClient.get(key);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      logger.warn(`Cache get failed for ${key}:`, err.message);
      return null;
    }
  }

  /**
   * JSON-serialise and store a value with a TTL.
   * @param {string} key
   * @param {any} value
   * @param {number} [ttlSeconds] - defaults to config.redis.cacheTtl
   */
  async set(key, value, ttlSeconds = config.redis.cacheTtl) {
    try {
      await redisClient.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch (err) {
      logger.warn(`Cache set failed for ${key}:`, err.message);
    }
  }

  /**
   * Delete a single key.
   * @param {string} key
   */
  async del(key) {
    try {
      await redisClient.del(key);
    } catch (err) {
      logger.warn(`Cache del failed for ${key}:`, err.message);
    }
  }

  /**
   * Delete every key matching a prefix using a non-blocking SCAN.
   * Used to invalidate all analytics/dashboard caches after a write.
   * @param {string} prefix
   */
  async delByPrefix(prefix) {
    try {
      const stream = redisClient.scanStream({ match: `${prefix}*`, count: 100 });
      const pipeline = redisClient.pipeline();
      let found = 0;
      for await (const keys of stream) {
        for (const key of keys) {
          pipeline.del(key);
          found += 1;
        }
      }
      if (found) await pipeline.exec();
    } catch (err) {
      logger.warn(`Cache delByPrefix failed for ${prefix}:`, err.message);
    }
  }

  /**
   * Cache-aside helper: return cached value or compute, store, and return it.
   * @param {string} key
   * @param {() => Promise<any>} producer - function that computes the value
   * @param {number} [ttlSeconds]
   */
  async remember(key, producer, ttlSeconds = config.redis.cacheTtl) {
    const cached = await this.get(key);
    if (cached !== null) return cached;
    const value = await producer();
    await this.set(key, value, ttlSeconds);
    return value;
  }
}

export const cacheService = new CacheService();
