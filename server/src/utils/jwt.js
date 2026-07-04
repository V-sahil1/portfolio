import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

/**
 * Sign a JWT for the admin.
 * @param {object} payload - claims (e.g. { sub, email, role })
 * @returns {string}
 */
export const signToken = (payload) =>
  jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

/**
 * Verify a JWT, throwing on failure.
 * @param {string} token
 * @returns {object} decoded claims
 */
export const verifyToken = (token) => jwt.verify(token, config.jwt.secret);
