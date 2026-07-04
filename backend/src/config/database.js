import { Sequelize } from 'sequelize';
import { config } from './env.js';
import { logger } from '../utils/logger.js';

/**
 * Single shared Sequelize instance for the whole application.
 * Models attach themselves to this connection in src/models.
 */
export const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    logging: config.db.logging ? (msg) => logger.debug(msg) : false,
    dialectOptions: config.db.ssl
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {},
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      underscored: false, // keep camelCase column names to match the model spec
      freezeTableName: false,
    },
  },
);

/**
 * Verify the database connection at boot. Throws on failure so the process
 * exits instead of serving requests against a dead database.
 * @returns {Promise<void>}
 */
export const connectDatabase = async () => {
  await sequelize.authenticate();
  logger.info('PostgreSQL connection established.');
};
