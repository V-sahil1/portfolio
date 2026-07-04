import { config } from '../config/env.js';

/**
 * Minimal, dependency-free leveled logger with timestamped output.
 * Swap internals for pino/winston later without changing call sites.
 */
const LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const active = config.isProd ? LEVELS.info : LEVELS.debug;

/** Format one log line. */
const fmt = (level, args) => {
  const time = new Date().toISOString();
  const body = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
  return `${time} [${level.toUpperCase()}] ${body}`;
};

export const logger = {
  error: (...a) => console.error(fmt('error', a)),
  warn: (...a) => LEVELS.warn <= active && console.warn(fmt('warn', a)),
  info: (...a) => LEVELS.info <= active && console.log(fmt('info', a)),
  debug: (...a) => LEVELS.debug <= active && console.log(fmt('debug', a)),
};
