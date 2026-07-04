import { Op } from 'sequelize';
import { BaseRepository } from './base.repository.js';
import { RefreshToken } from '../models/index.js';

/**
 * Data access for persisted refresh tokens (rotation + revocation).
 */
class RefreshTokenRepository extends BaseRepository {
  constructor() {
    super(RefreshToken);
  }

  /**
   * Find an active (not revoked, not expired) token record.
   * @param {string} token - the raw refresh JWT
   */
  findActive(token) {
    return this.findOne({
      token,
      revokedAt: null,
      expiresAt: { [Op.gt]: new Date() },
    });
  }

  /**
   * Mark a specific token as revoked.
   * @param {string} token
   */
  revoke(token) {
    return this.update({ revokedAt: new Date() }, { token });
  }

  /**
   * Revoke every active token for an admin (logout-all / password change).
   * @param {string} adminId
   */
  revokeAllForAdmin(adminId) {
    return this.update({ revokedAt: new Date() }, { adminId, revokedAt: null });
  }
}

export const refreshTokenRepository = new RefreshTokenRepository();
