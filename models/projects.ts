import database from '@/lib/database';
import { EventData, MAX_100_CHARS, MAX_20_CHARS } from '@/util/common';
import { DataTypes, Model } from 'sequelize';

export interface ProjectDatabaseInterface extends EventData {
  UserId: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectModelInterface extends Model<ProjectDatabaseInterface>, ProjectDatabaseInterface {}

const Projects = database.db.define<ProjectModelInterface>('Projects', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(MAX_20_CHARS),
    allowNull: false,
  },
  shortDescription: {
    type: DataTypes.STRING(MAX_100_CHARS),
    allowNull: false,
  },
  importance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Projects;
