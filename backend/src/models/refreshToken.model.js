import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

/**
 * RefreshToken — persisted so refresh tokens can be revoked on logout and
 * rotated on refresh. We store the raw JWT string alongside its admin + expiry.
 */
export class RefreshToken extends Model {}

RefreshToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    adminId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    revokedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens',
    timestamps: true,
    updatedAt: false,
    indexes: [{ fields: ['adminId'] }, { fields: ['token'] }],
  },
);
