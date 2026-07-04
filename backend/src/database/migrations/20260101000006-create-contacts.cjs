'use strict';

/**
 * Create the `contacts` table (contact-form submissions).
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contacts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      visitorId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'visitors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      sessionId: { type: Sequelize.UUID, allowNull: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      company: { type: Sequelize.STRING, allowNull: true },
      designation: { type: Sequelize.STRING, allowNull: true },
      phone: { type: Sequelize.STRING, allowNull: true },
      subject: { type: Sequelize.STRING, allowNull: true },
      message: { type: Sequelize.TEXT, allowNull: false },
      ipAddress: { type: Sequelize.STRING, allowNull: true },
      status: {
        type: Sequelize.ENUM('new', 'read', 'archived'),
        allowNull: false,
        defaultValue: 'new',
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.addIndex('contacts', ['visitorId']);
    await queryInterface.addIndex('contacts', ['email']);
    await queryInterface.addIndex('contacts', ['status']);
    await queryInterface.addIndex('contacts', ['createdAt']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('contacts');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_contacts_status";');
  },
};
