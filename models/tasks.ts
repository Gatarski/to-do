import database from '@/lib/database';
import { MAX_100_CHARS, TaskData } from '@/util/common';
import { DataTypes, Model } from 'sequelize';

export interface TasksDatabaseInterface extends TaskData {
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
    type: DataTypes.STRING(MAX_100_CHARS),
    allowNull: false,
  },
  importance: {
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
});

export default Tasks;
