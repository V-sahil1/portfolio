'use strict';

/**
 * Create the `visitor_sessions` table. `sessionId` is UNIQUE so that
 * visitor_events can reference it as a foreign key.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('visitor_sessions', {
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
      sessionId: { type: Sequelize.UUID, allowNull: false, unique: true },
      ipAddress: { type: Sequelize.STRING, allowNull: true },
      country: { type: Sequelize.STRING, allowNull: true },
      city: { type: Sequelize.STRING, allowNull: true },
      region: { type: Sequelize.STRING, allowNull: true },
      browser: { type: Sequelize.STRING, allowNull: true },
      browserVersion: { type: Sequelize.STRING, allowNull: true },
      operatingSystem: { type: Sequelize.STRING, allowNull: true },
      device: { type: Sequelize.STRING, allowNull: true },
      deviceType: { type: Sequelize.STRING, allowNull: true },
      screenResolution: { type: Sequelize.STRING, allowNull: true },
      language: { type: Sequelize.STRING, allowNull: true },
      timezone: { type: Sequelize.STRING, allowNull: true },
      landingPage: { type: Sequelize.STRING, allowNull: true },
      referrer: { type: Sequelize.STRING, allowNull: true },
      userAgent: { type: Sequelize.TEXT, allowNull: true },
      visitDuration: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.addIndex('visitor_sessions', ['visitorId']);
    await queryInterface.addIndex('visitor_sessions', ['country']);
    await queryInterface.addIndex('visitor_sessions', ['browser']);
    await queryInterface.addIndex('visitor_sessions', ['deviceType']);
    await queryInterface.addIndex('visitor_sessions', ['createdAt']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('visitor_sessions');
  },
};
