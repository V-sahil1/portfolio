import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

/**
 * Contact — a submission from the portfolio contact form. Linked to a visitor
 * when one is known. Submitting a contact triggers an email notification job.
 */
export class Contact extends Model {}

Contact.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    visitorId: { type: DataTypes.UUID, allowNull: true },
    sessionId: { type: DataTypes.UUID, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    company: { type: DataTypes.STRING, allowNull: true },
    designation: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    subject: { type: DataTypes.STRING, allowNull: true },
    message: { type: DataTypes.TEXT, allowNull: false },
    ipAddress: { type: DataTypes.STRING, allowNull: true },
    status: {
      type: DataTypes.ENUM('new', 'read', 'archived'),
      allowNull: false,
      defaultValue: 'new',
    },
  },
  {
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts',
    timestamps: true,
    indexes: [
      { fields: ['visitorId'] },
      { fields: ['email'] },
      { fields: ['status'] },
      { fields: ['createdAt'] },
    ],
  },
);
