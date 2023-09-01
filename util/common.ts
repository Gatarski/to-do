export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

export interface EventData {
  id?: number;
  title: string;
  shortDescription: string;
  importance: 'small' | 'medium' | 'very';
  deadline: string;
  status: 'pending' | 'closed';
}

export const ICON_SIZE = '38px';

export const FIELD_MAX_100_CHARS_VALIDATION_MESSAGE = `[fieldName] can't be longer 100 characters`;
export const FIELD_MAX_50_CHARS_VALIDATION_MESSAGE = `[fieldName] can't be longer 50 characters`;
export const FIELD_MAX_20_CHARS_VALIDATION_MESSAGE = `[fieldName] can't be longer 20 characters`;
export const FIELD_REQUIRED_VALIDATION_MESSAGE = 'This field is required';
export const MAX_100_CHARS = 100;
export const MAX_50_CHARS = 50;
export const MAX_20_CHARS = 20;
