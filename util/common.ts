export interface AuthFormData {
  id?: number;
  email: string;
  password: string;
  name?: string;
}

export interface EventCardData {
  title: string;
  shortDescription: string;
  importance: 'small' | 'medium' | 'very';
  deadline: string;
  status: 'pending' | 'closed';
}

 export const ICON_SIZE = '38px';