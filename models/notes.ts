import database from '@/lib/database';
import { NoteData } from '@/types/types';
import {
  MAX_200_CHARS,
  MAX_20_CHARS,
} from '@/constants/sizes';
import { DataTypes, Model } from 'sequelize';

export interface NotesDatabaseInterface extends NoteData {
  UserId?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface NotesModelInterface extends Model<NotesDatabaseInterface>, NotesDatabaseInterface {}

const Notes = database.db.define<NotesModelInterface>('Notes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(MAX_20_CHARS),
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING(MAX_200_CHARS),
    allowNull: false,
  },
  isImportant: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Notes;
