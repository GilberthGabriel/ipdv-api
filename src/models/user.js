import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import db from '../config/db';
import { RoleModel } from './role';

export const UserModel = db.define('User', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

UserModel.belongsTo(RoleModel);

export async function generateHash(password) {
  return bcrypt.hash(password, 8);
}

export async function compareHash(password, hash) {
  return bcrypt.compare(password, hash);
}
