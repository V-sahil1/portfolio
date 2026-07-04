import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

/**
 * Visitor — a person identified on the portfolio (e.g. a recruiter who filled
 * in their details). One visitor can have many sessions, events and contacts.
 */
export class Visitor extends Model {}

Visitor.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: true },
    designation: { type: DataTypes.STRING, allowNull: true },
    company: { type: DataTypes.STRING, allowNull: true },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true },
    },
    linkedin: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: 'Visitor',
    tableName: 'visitors',
    timestamps: true, // createdAt + updatedAt
    indexes: [
      { fields: ['company'] },
      { fields: ['email'] },
      { fields: ['designation'] },
      { fields: ['createdAt'] },
    ],
  },
);
