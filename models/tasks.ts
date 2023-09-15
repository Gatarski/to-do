import database from '@/lib/database';
import { TaskData } from '@/types/types';
import {
  MAX_70_CHARS,
} from '@/constants/sizes';
import { DataTypes, Model } from 'sequelize';

export interface TasksDatabaseInterface extends TaskData {
  UserId?: number;
  ProjectId?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface TasksModelInterface extends Model<TasksDatabaseInterface>, TasksDatabaseInterface {}

const Tasks = database.db.define<TasksModelInterface>('Tasks', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  task: {
    type: DataTypes.STRING(MAX_70_CHARS),
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  ProjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Tasks;
