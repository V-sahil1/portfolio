/* eslint-disable */
/**
 * Sequelize CLI database config (CommonJS).
 * The CLI cannot read the ESM config in src/config, so this file mirrors the
 * same environment variables for `sequelize-cli db:migrate` / `db:seed`.
 */
require('dotenv').config();

const useSSL = String(process.env.DB_SSL).toLowerCase() === 'true';

/** Shared connection block built from environment variables. */
const base = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'portfolio_analytics',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: String(process.env.DB_LOGGING).toLowerCase() === 'true' ? console.log : false,
  dialectOptions: useSSL
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {},
};

module.exports = {
  development: base,
  test: { ...base, database: `${base.database}_test` },
  production: base,
};
