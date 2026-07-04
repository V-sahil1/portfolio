import { logger } from '../utils/logger.js';

/**
 * Realtime layer (reserved).
 *
 * The dashboard currently polls REST endpoints, so no socket server is wired
 * by default. This hook exists so a realtime transport (e.g. live visitor feed)
 * can be attached to the HTTP server later without changing the bootstrap.
 *
 * @param {import('http').Server} _httpServer
 */
export const initSockets = (_httpServer) => {
  logger.debug('Realtime sockets are not enabled (reserved).');
  return null;
};
