import { Sequelize } from 'sequelize';
import { config } from './env.js';
import { logger } from '../utils/logger.js';

/**
 * Single shared Sequelize instance for the application.
 */
export const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
  logging: config.db.logging ? (msg) => logger.debug(msg) : false,
  dialectOptions: config.db.ssl ? { ssl: { require: true, rejectUnauthorized: false } } : {},
  pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
});

/**
 * Verify the DB connection at boot (fail fast if the database is unreachable).
 * @returns {Promise<void>}
 */
export const connectDatabase = async () => {
  await sequelize.authenticate();
  logger.info('PostgreSQL connection established.');
};
