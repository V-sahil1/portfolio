import { config } from '../config/env.js';

/**
 * Minimal, dependency-free leveled logger.
 * Writes structured, timestamped lines to stdout/stderr. In production you can
 * swap the internals for winston/pino without changing call sites.
 */
const LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const activeLevel = config.isProd ? LEVELS.info : LEVELS.debug;

/**
 * Format a single log line.
 * @param {string} level
 * @param {unknown[]} args
 */
const format = (level, args) => {
  const time = new Date().toISOString();
  const parts = args.map((a) =>
    typeof a === 'object' ? JSON.stringify(a) : String(a),
  );
  return `${time} [${level.toUpperCase()}] ${parts.join(' ')}`;
};

export const logger = {
  /** Log an error (always shown). */
  error: (...args) => console.error(format('error', args)),
  /** Log a warning. */
  warn: (...args) => LEVELS.warn <= activeLevel && console.warn(format('warn', args)),
  /** Log general information. */
  info: (...args) => LEVELS.info <= activeLevel && console.log(format('info', args)),
  /** Log verbose debug output (hidden in production). */
  debug: (...args) => LEVELS.debug <= activeLevel && console.log(format('debug', args)),
};
