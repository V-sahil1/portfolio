'use strict';

/**
 * Create the `visitors` table (identified people, e.g. recruiters).
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('visitors', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: true },
      designation: { type: Sequelize.STRING, allowNull: true },
      company: { type: Sequelize.STRING, allowNull: true },
      email: { type: Sequelize.STRING, allowNull: true },
      linkedin: { type: Sequelize.STRING, allowNull: true },
      phone: { type: Sequelize.STRING, allowNull: true },
      notes: { type: Sequelize.TEXT, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.addIndex('visitors', ['company']);
    await queryInterface.addIndex('visitors', ['email']);
    await queryInterface.addIndex('visitors', ['designation']);
    await queryInterface.addIndex('visitors', ['createdAt']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('visitors');
  },
};
