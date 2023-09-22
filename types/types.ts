import { Dayjs } from 'dayjs';

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

export type EventStatus = 'pending' | 'closed' | 'tasks done';

export interface EventData {
  id?: number;
  title: string;
  shortDescription: string;
  priority: string;
  deadline: string | Dayjs;
  status: EventStatus;
}

export interface TaskData {
  id?: string;
  task: string;
  isDone: boolean;
  priority: string;
  isDisabled?: boolean;
}

export interface NoteData {
  id?: string;
  title: string;
  note?: string;
  isImportant: boolean;
}

export type ItemType = 'event' | 'task' | 'note';

export type SearchKeyType = 'title' | 'priority';

export interface ModalMessages {
  title: string;
  subtitle: string;
}

export interface ProfileData {
  email?: string;
  name?: string;
}

export interface PreviewData {
  projectsTotalNumber: number;
  projectsCompletedNumber: number;
  projectsWithCompletedTasks: number;
  tasksTotalNumber: number;
  tasksCompletedNumber: number;
  notesTotalNumber: number;
  notesImportantNumber: number;
}

export type ModalType = 'add' | 'edit';
