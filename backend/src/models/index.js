import { sequelize } from '../config/database.js';
import { Admin } from './admin.model.js';
import { RefreshToken } from './refreshToken.model.js';
import { Visitor } from './visitor.model.js';
import { VisitorSession } from './visitorSession.model.js';
import { VisitorEvent } from './visitorEvent.model.js';
import { Contact } from './contact.model.js';

/* --------------------------------------------------------------------------
 * Associations
 * ------------------------------------------------------------------------ */

// Admin ⇄ RefreshToken
Admin.hasMany(RefreshToken, { foreignKey: 'adminId', as: 'refreshTokens', onDelete: 'CASCADE' });
RefreshToken.belongsTo(Admin, { foreignKey: 'adminId', as: 'admin' });

// Visitor ⇄ VisitorSession
Visitor.hasMany(VisitorSession, { foreignKey: 'visitorId', as: 'sessions', onDelete: 'SET NULL' });
VisitorSession.belongsTo(Visitor, { foreignKey: 'visitorId', as: 'visitor' });

// Visitor ⇄ VisitorEvent
Visitor.hasMany(VisitorEvent, { foreignKey: 'visitorId', as: 'events', onDelete: 'SET NULL' });
VisitorEvent.belongsTo(Visitor, { foreignKey: 'visitorId', as: 'visitor' });

// Visitor ⇄ Contact
Visitor.hasMany(Contact, { foreignKey: 'visitorId', as: 'contacts', onDelete: 'SET NULL' });
Contact.belongsTo(Visitor, { foreignKey: 'visitorId', as: 'visitor' });

// VisitorSession ⇄ VisitorEvent (correlated on the business key `sessionId`)
VisitorSession.hasMany(VisitorEvent, {
  foreignKey: 'sessionId',
  sourceKey: 'sessionId',
  as: 'events',
});
VisitorEvent.belongsTo(VisitorSession, {
  foreignKey: 'sessionId',
  targetKey: 'sessionId',
  as: 'session',
});

/**
 * Convenience export of every model + the shared sequelize instance.
 */
export const db = {
  sequelize,
  Admin,
  RefreshToken,
  Visitor,
  VisitorSession,
  VisitorEvent,
  Contact,
};

export { sequelize, Admin, RefreshToken, Visitor, VisitorSession, VisitorEvent, Contact };
