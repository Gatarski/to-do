import database from '@/lib/database';
import { AuthFormData } from '@/types/types';
import {
  MAX_20_CHARS,
  MAX_50_CHARS,
} from '@/constants/sizes';
import { DataTypes, Model } from 'sequelize';

export interface UserDatabaseInterface extends AuthFormData {
  id: number;
}

interface UserModelInterface extends Model<UserDatabaseInterface>, UserDatabaseInterface {}

const Users = database.db.define<UserModelInterface>('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(MAX_50_CHARS),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(MAX_20_CHARS),
    allowNull: true,
  },
});

export default Users;
