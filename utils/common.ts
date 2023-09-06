import { Dayjs } from 'dayjs';

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

export interface EventData {
  id?: number;
  title: string;
  shortDescription: string;
  priority: 'small' | 'medium' | 'urgent';
  deadline: string | Dayjs;
  status: 'pending' | 'closed' | 'tasks done';
}

export interface TaskData {
  id?: string;
  task: string;
  isDone: boolean;
  priority: 'small' | 'medium' | 'urgent';
}

export type ItemType = 'event' | 'task';

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
}

export const FIELD_MAX_100_CHARS_VALIDATION_MESSAGE = `[fieldName] can't be longer 100 characters`;
export const FIELD_MAX_70_CHARS_VALIDATION_MESSAGE = `[fieldName] can't be longer 70 characters`;
export const FIELD_MAX_50_CHARS_VALIDATION_MESSAGE = `[fieldName] can't be longer 50 characters`;
export const FIELD_MAX_20_CHARS_VALIDATION_MESSAGE = `[fieldName] can't be longer 20 characters`;
export const FIELD_REQUIRED_VALIDATION_MESSAGE = 'This field is required';
export const MAX_100_CHARS = 100;
export const MAX_70_CHARS = 70;
export const MAX_50_CHARS = 50;
export const MAX_20_CHARS = 20;
