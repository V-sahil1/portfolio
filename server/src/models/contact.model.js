import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

/**
 * Contact — a single portfolio contact-form submission, enriched with the
 * visitor's network/device context at the time of submission.
 */
export class Contact extends Model {}

Contact.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    message: { type: DataTypes.TEXT, allowNull: false },
    ipAddress: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    browser: { type: DataTypes.STRING, allowNull: true },
    device: { type: DataTypes.STRING, allowNull: true },
    userAgent: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts',
    timestamps: true, // createdAt + updatedAt
    indexes: [{ fields: ['email'] }, { fields: ['createdAt'] }],
  },
);
