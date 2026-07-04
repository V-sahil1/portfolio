import { BaseRepository } from './base.repository.js';
import { Admin } from '../models/index.js';

/**
 * Data access for admin accounts.
 */
class AdminRepository extends BaseRepository {
  constructor() {
    super(Admin);
  }

  /**
   * Find an admin by email INCLUDING the password hash (for login only).
   * Uses the `withPassword` scope to override the default exclusion.
   * @param {string} email
   */
  findByEmailWithPassword(email) {
    return Admin.scope('withPassword').findOne({ where: { email } });
  }

  /**
   * Find an admin by email (password hash excluded).
   * @param {string} email
   */
  findByEmail(email) {
    return this.findOne({ email });
  }
}

export const adminRepository = new AdminRepository();
