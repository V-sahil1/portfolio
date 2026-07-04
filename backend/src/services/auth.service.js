import { adminRepository } from '../repositories/admin.repository.js';
import { refreshTokenRepository } from '../repositories/refreshToken.repository.js';
import { comparePassword } from '../utils/password.js';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.js';
import { config } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { MESSAGES } from '../constants/index.js';

/** Convert a JWT "expiresIn" string/seconds into an absolute Date. */
const refreshExpiryDate = () => {
  const value = config.jwt.refreshExpiresIn;
  const match = /^(\d+)([smhd])$/.exec(String(value));
  const unitMs = { s: 1e3, m: 6e4, h: 36e5, d: 864e5 };
  const ms = match ? Number(match[1]) * unitMs[match[2]] : 7 * 864e5;
  return new Date(Date.now() + ms);
};

/**
 * Build the JWT claim set for an admin.
 * @param {object} admin
 */
const buildClaims = (admin) => ({ sub: admin.id, email: admin.email, role: admin.role });

class AuthService {
  /**
   * Authenticate an admin and issue an access + refresh token pair.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ admin: object, accessToken: string, refreshToken: string }>}
   */
  async login(email, password) {
    // Fetch WITH password hash (default scope hides it).
    const admin = await adminRepository.findByEmailWithPassword(email);
    if (!admin || !admin.isActive) {
      throw ApiError.unauthorized(MESSAGES.INVALID_CREDENTIALS);
    }

    const valid = await comparePassword(password, admin.password);
    if (!valid) throw ApiError.unauthorized(MESSAGES.INVALID_CREDENTIALS);

    const claims = buildClaims(admin);
    const accessToken = signAccessToken(claims);
    const refreshToken = signRefreshToken(claims);

    // Persist the refresh token so it can be revoked/rotated later.
    await refreshTokenRepository.create({
      adminId: admin.id,
      token: refreshToken,
      expiresAt: refreshExpiryDate(),
    });

    await adminRepository.update({ lastLoginAt: new Date() }, { id: admin.id });

    // Strip the hash before returning.
    const safeAdmin = admin.toJSON();
    delete safeAdmin.password;

    return { admin: safeAdmin, accessToken, refreshToken };
  }

  /**
   * Rotate a refresh token: verify it, ensure it is active in the DB, revoke
   * the old one and issue a fresh pair.
   * @param {string} token
   * @returns {Promise<{ accessToken: string, refreshToken: string }>}
   */
  async refresh(token) {
    if (!token) throw ApiError.unauthorized(MESSAGES.TOKEN_MISSING);

    let claims;
    try {
      claims = verifyRefreshToken(token);
    } catch {
      throw ApiError.unauthorized(MESSAGES.INVALID_TOKEN);
    }

    const record = await refreshTokenRepository.findActive(token);
    if (!record) throw ApiError.unauthorized(MESSAGES.INVALID_TOKEN);

    // Rotate: revoke the presented token, issue a new pair.
    await refreshTokenRepository.revoke(token);

    const newClaims = { sub: claims.sub, email: claims.email, role: claims.role };
    const accessToken = signAccessToken(newClaims);
    const refreshToken = signRefreshToken(newClaims);
    await refreshTokenRepository.create({
      adminId: claims.sub,
      token: refreshToken,
      expiresAt: refreshExpiryDate(),
    });

    return { accessToken, refreshToken };
  }

  /**
   * Log out by revoking the presented refresh token.
   * @param {string} token
   */
  async logout(token) {
    if (token) await refreshTokenRepository.revoke(token);
    return true;
  }
}

export const authService = new AuthService();
