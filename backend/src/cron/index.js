import { Op } from 'sequelize';
import { RefreshToken } from '../models/index.js';
import { logger } from '../utils/logger.js';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/** Handle to the interval timer so it can be cleared on shutdown. */
let timer = null;

/**
 * Delete refresh tokens that are expired or were revoked over a day ago,
 * keeping the table small. Runs immediately and then daily.
 * @returns {Promise<number>} number of rows deleted
 */
export const purgeStaleRefreshTokens = async () => {
  const deleted = await RefreshToken.destroy({
    where: {
      [Op.or]: [
        { expiresAt: { [Op.lt]: new Date() } },
        { revokedAt: { [Op.lt]: new Date(Date.now() - ONE_DAY_MS) } },
      ],
    },
  });
  if (deleted) logger.info(`Cron: purged ${deleted} stale refresh token(s).`);
  return deleted;
};

/**
 * Start the lightweight cron scheduler (interval-based; no external cron
 * dependency). Safe to call once at boot.
 */
export const startCronJobs = () => {
  // Run once shortly after boot, then every 24h.
  purgeStaleRefreshTokens().catch((err) => logger.warn('Cron purge failed:', err.message));
  timer = setInterval(() => {
    purgeStaleRefreshTokens().catch((err) => logger.warn('Cron purge failed:', err.message));
  }, ONE_DAY_MS);
  // Do not keep the event loop alive solely for the timer.
  if (timer.unref) timer.unref();
  logger.info('Cron jobs scheduled.');
};

/** Stop all scheduled cron jobs (graceful shutdown). */
export const stopCronJobs = () => {
  if (timer) clearInterval(timer);
  timer = null;
};
