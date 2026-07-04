'use strict';

/**
 * Create the `admins` table (dashboard users authenticated with JWT).
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admins', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      role: {
        type: Sequelize.ENUM('admin', 'super_admin'),
        allowNull: false,
        defaultValue: 'admin',
      },
      isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      lastLoginAt: { type: Sequelize.DATE, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('admins');
    // Clean up the ENUM type created for `role` (PostgreSQL).
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_admins_role";');
  },
};
