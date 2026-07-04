import { config } from '../config/env.js';
import { signToken } from '../utils/jwt.js';
import { ApiError } from '../utils/ApiError.js';
import { MESSAGES } from '../constants/index.js';

/**
 * AuthService — single-admin authentication against the credentials configured
 * in the environment. Issues a signed JWT on success.
 */
class AuthService {
  /**
   * Validate admin credentials and return a JWT.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ token: string, admin: { email: string, role: string } }>}
   */
  async login(email, password) {
    const matches =
      email?.toLowerCase() === config.admin.email.toLowerCase() &&
      password === config.admin.password;

    if (!matches) throw ApiError.unauthorized(MESSAGES.INVALID_CREDENTIALS);

    const admin = { email: config.admin.email, role: 'admin' };
    const token = signToken({ sub: admin.email, email: admin.email, role: admin.role });
    return { token, admin };
  }
}

export const authService = new AuthService();
