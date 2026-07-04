import dotenv from 'dotenv';

// Load variables from .env into process.env (once, at import time).
dotenv.config();

/**
 * Read a required environment variable, throwing early if it is missing.
 * Prevents the app from booting in a half-configured state.
 * @param {string} key - environment variable name
 * @param {string} [fallback] - optional default for non-critical values
 * @returns {string}
 */
const required = (key, fallback = undefined) => {
  const value = process.env[key] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

/** Parse a boolean-like environment string ("true"/"false"). */
const bool = (key, fallback = false) => {
  const value = process.env[key];
  if (value === undefined) return fallback;
  return String(value).toLowerCase() === 'true';
};

/**
 * Central, typed configuration object.
 * Everything downstream imports from here instead of touching process.env.
 */
export const config = Object.freeze({
  env: process.env.NODE_ENV || 'development',
  isProd: (process.env.NODE_ENV || 'development') === 'production',
  port: Number(process.env.PORT || 4000),
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  corsOrigins: (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    name: process.env.DB_NAME || 'portfolio_analytics',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: bool('DB_LOGGING', false),
    ssl: bool('DB_SSL', false),
  },

  jwt: {
    accessSecret: required('JWT_ACCESS_SECRET', 'dev_access_secret'),
    refreshSecret: required('JWT_REFRESH_SECRET', 'dev_refresh_secret'),
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASSWORD || undefined,
    username: process.env.REDIS_USERNAME || undefined,
    cacheTtl: Number(process.env.CACHE_TTL_SECONDS || 120),
  },

  mail: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: bool('SMTP_SECURE', false),
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
    from: process.env.MAIL_FROM || 'Portfolio Analytics <no-reply@portfolio.local>',
    notifyEmail: process.env.NOTIFY_EMAIL || process.env.SMTP_USER || '',
  },

  admin: {
    name: process.env.ADMIN_NAME || 'Admin',
    email: process.env.ADMIN_EMAIL || 'admin@portfolio.local',
    password: process.env.ADMIN_PASSWORD || 'Admin@12345',
  },

  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
    max: Number(process.env.RATE_LIMIT_MAX || 300),
  },
});
