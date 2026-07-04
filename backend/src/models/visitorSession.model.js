import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

/**
 * VisitorSession — a single browsing session, enriched with device/geo/network
 * context. `sessionId` is a client-generated UUID used to correlate events.
 */
export class VisitorSession extends Model {}

VisitorSession.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    visitorId: {
      type: DataTypes.UUID,
      allowNull: true, // anonymous sessions are allowed until a visitor identifies
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    ipAddress: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    region: { type: DataTypes.STRING, allowNull: true },
    browser: { type: DataTypes.STRING, allowNull: true },
    browserVersion: { type: DataTypes.STRING, allowNull: true },
    operatingSystem: { type: DataTypes.STRING, allowNull: true },
    device: { type: DataTypes.STRING, allowNull: true },
    deviceType: { type: DataTypes.STRING, allowNull: true }, // desktop | mobile | tablet
    screenResolution: { type: DataTypes.STRING, allowNull: true },
    language: { type: DataTypes.STRING, allowNull: true },
    timezone: { type: DataTypes.STRING, allowNull: true },
    landingPage: { type: DataTypes.STRING, allowNull: true },
    referrer: { type: DataTypes.STRING, allowNull: true },
    userAgent: { type: DataTypes.TEXT, allowNull: true },
    visitDuration: {
      type: DataTypes.INTEGER, // seconds
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'VisitorSession',
    tableName: 'visitor_sessions',
    timestamps: true,
    updatedAt: false, // spec: createdAt only
    indexes: [
      { fields: ['visitorId'] },
      { unique: true, fields: ['sessionId'] },
      { fields: ['country'] },
      { fields: ['browser'] },
      { fields: ['deviceType'] },
      { fields: ['createdAt'] },
    ],
  },
);
