'use strict';

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/**
 * Seed the initial admin account from environment variables.
 * The password is bcrypt-hashed before insert.
 */
module.exports = {
  async up(queryInterface) {
    const email = process.env.ADMIN_EMAIL || 'admin@portfolio.local';
    const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
    const name = process.env.ADMIN_NAME || 'Admin';

    // Do not create duplicates if the seeder is re-run.
    const [existing] = await queryInterface.sequelize.query(
      'SELECT id FROM admins WHERE email = :email LIMIT 1;',
      { replacements: { email }, type: queryInterface.sequelize.QueryTypes.SELECT },
    );
    if (existing) return;

    const now = new Date();
    await queryInterface.bulkInsert('admins', [
      {
        id: uuidv4(),
        name,
        email,
        password: await bcrypt.hash(password, 12),
        role: 'super_admin',
        isActive: true,
        lastLoginAt: null,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    const email = process.env.ADMIN_EMAIL || 'admin@portfolio.local';
    await queryInterface.bulkDelete('admins', { email });
  },
};
