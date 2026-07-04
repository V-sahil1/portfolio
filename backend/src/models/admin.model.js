import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';
import { ROLES } from '../constants/index.js';

/**
 * Admin — the portfolio owner / dashboard user. Authenticated with JWT.
 * The password is always stored as a bcrypt hash (never plaintext).
 */
export class Admin extends Model {}

Admin.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(ROLES)),
      allowNull: false,
      defaultValue: ROLES.ADMIN,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Admin',
    tableName: 'admins',
    timestamps: true,
    defaultScope: {
      // Never leak the password hash by default.
      attributes: { exclude: ['password'] },
    },
    scopes: {
      // Explicitly opt-in when the hash is needed (e.g. login).
      withPassword: { attributes: { include: ['password'] } },
    },
  },
);
