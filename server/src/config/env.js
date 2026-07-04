import dotenv from 'dotenv';

// Load .env into process.env once, at import time.
dotenv.config();

/** Parse a boolean-like env string ("true"/"false"). */
const bool = (key, fallback = false) => {
  const v = process.env[key];
  return v === undefined ? fallback : String(v).toLowerCase() === 'true';
};

/**
 * Central, frozen configuration object. Everything reads from here rather than
 * touching process.env directly.
 */
export const config = Object.freeze({
  env: process.env.NODE_ENV || 'development',
  isProd: (process.env.NODE_ENV || 'development') === 'production',
  port: Number(process.env.PORT || 5000),
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  displayTimezone: process.env.DISPLAY_TIMEZONE || 'Asia/Kolkata',
  corsOrigins: (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    name: process.env.DB_NAME || 'portfolio_contact',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: bool('DB_LOGGING', false),
    ssl: bool('DB_SSL', false),
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'dev_secret_change_me',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },

  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@portfolio.local',
    password: process.env.ADMIN_PASSWORD || 'Admin@12345',
  },

  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
    max: Number(process.env.RATE_LIMIT_MAX || 100),
    contactMax: Number(process.env.CONTACT_RATE_LIMIT_MAX || 5),
  },

  whatsapp: {
    enabled: bool('WHATSAPP_ENABLED', false),
    apiVersion: process.env.WHATSAPP_API_VERSION || 'v21.0',
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    to: process.env.WHATSAPP_TO || '',
    messageType: process.env.WHATSAPP_MESSAGE_TYPE || 'text', // 'text' | 'template'
    templateName: process.env.WHATSAPP_TEMPLATE_NAME || 'portfolio_contact',
    templateLang: process.env.WHATSAPP_TEMPLATE_LANG || 'en_US',
  },

  geo: {
    enabled: bool('GEO_ENABLED', true),
    apiUrl: process.env.GEO_API_URL || 'http://ip-api.com/json',
  },
});
