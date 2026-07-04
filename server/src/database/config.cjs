/* eslint-disable */
/**
 * Sequelize CLI database config (CommonJS). Mirrors the env vars used by the
 * ESM app config so `sequelize-cli db:migrate` connects to the same database.
 */
require('dotenv').config();

const useSSL = String(process.env.DB_SSL).toLowerCase() === 'true';

const base = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'portfolio_contact',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: String(process.env.DB_LOGGING).toLowerCase() === 'true' ? console.log : false,
  dialectOptions: useSSL ? { ssl: { require: true, rejectUnauthorized: false } } : {},
};

module.exports = {
  development: base,
  test: { ...base, database: `${base.database}_test` },
  production: base,
};
