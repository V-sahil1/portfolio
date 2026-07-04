import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';
import { EVENT_TYPE_VALUES } from '../constants/index.js';

/**
 * VisitorEvent — an individual tracked interaction (page view, click, scroll…).
 * `action` is constrained to the known EVENT_TYPES; `metadata` holds arbitrary
 * structured context (e.g. { projectId, projectName }).
 */
export class VisitorEvent extends Model {}

VisitorEvent.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    visitorId: { type: DataTypes.UUID, allowNull: true },
    sessionId: { type: DataTypes.UUID, allowNull: true },
    page: { type: DataTypes.STRING, allowNull: true },
    action: {
      type: DataTypes.ENUM(...EVENT_TYPE_VALUES),
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
  },
  {
    sequelize,
    modelName: 'VisitorEvent',
    tableName: 'visitor_events',
    timestamps: true,
    updatedAt: false, // spec: createdAt only
    indexes: [
      { fields: ['visitorId'] },
      { fields: ['sessionId'] },
      { fields: ['action'] },
      { fields: ['page'] },
      { fields: ['createdAt'] },
    ],
  },
);
