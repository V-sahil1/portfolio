import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

/**
 * Sign a short-lived access token.
 * @param {object} payload - claims (e.g. { sub, email, role })
 * @returns {string} signed JWT
 */
export const signAccessToken = (payload) =>
  jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  });

/**
 * Sign a long-lived refresh token.
 * @param {object} payload
 * @returns {string} signed JWT
 */
export const signRefreshToken = (payload) =>
  jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });

/**
 * Verify an access token, throwing on failure.
 * @param {string} token
 * @returns {object} decoded claims
 */
export const verifyAccessToken = (token) =>
  jwt.verify(token, config.jwt.accessSecret);

/**
 * Verify a refresh token, throwing on failure.
 * @param {string} token
 * @returns {object} decoded claims
 */
export const verifyRefreshToken = (token) =>
  jwt.verify(token, config.jwt.refreshSecret);
