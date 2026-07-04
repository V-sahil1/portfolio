'use strict';

const EVENT_TYPES = [
  'VIEW_HOME',
  'VIEW_ABOUT',
  'VIEW_PROJECT',
  'VIEW_EXPERIENCE',
  'VIEW_CONTACT',
  'VIEW_SKILLS',
  'CLICK_GITHUB',
  'CLICK_LINKEDIN',
  'CLICK_RESUME',
  'DOWNLOAD_RESUME',
  'CONTACT_FORM',
  'SEND_EMAIL',
  'OPEN_PROJECT',
  'SCROLL_50',
  'SCROLL_100',
];

/**
 * Create the `visitor_events` table. `action` is an ENUM of known event types.
 * `sessionId` references visitor_sessions.sessionId (the unique business key).
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('visitor_events', {
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
      sessionId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'visitor_sessions', key: 'sessionId' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      page: { type: Sequelize.STRING, allowNull: true },
      action: { type: Sequelize.ENUM(...EVENT_TYPES), allowNull: false },
      metadata: { type: Sequelize.JSONB, allowNull: true, defaultValue: {} },
      createdAt: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.addIndex('visitor_events', ['visitorId']);
    await queryInterface.addIndex('visitor_events', ['sessionId']);
    await queryInterface.addIndex('visitor_events', ['action']);
    await queryInterface.addIndex('visitor_events', ['page']);
    await queryInterface.addIndex('visitor_events', ['createdAt']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('visitor_events');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_visitor_events_action";');
  },
};
