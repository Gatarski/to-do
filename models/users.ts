import database from '@/lib/database';
import { MAX_50_CHARS } from '@/util/common';
import { DataTypes, Model } from 'sequelize';

export interface UserDatabaseInterface {
  id: number;
  email: string;
  password: string;
  name?: string;
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
    type: DataTypes.STRING(MAX_50_CHARS),
    allowNull: true,
  },
});

export default Users;
