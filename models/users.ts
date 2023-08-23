import database from '@/lib/database';
import { DataTypes, Model } from 'sequelize';
import { AuthFormData } from '@/types/common';

interface UserModelInterface extends Model<AuthFormData>, AuthFormData {}

const Users = database.db.define<UserModelInterface>('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

export default Users;
