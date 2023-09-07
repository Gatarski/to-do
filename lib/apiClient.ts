import axios, { AxiosError } from 'axios';
import { AuthFormData, EventData, NoteData, ProfileData } from '@/utils/common';
import { TasksDatabaseInterface } from '@/models/tasks';

interface FetcherInterface {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body: Record<string, any>;
}

const fetcher = async ({ url, method, body }: FetcherInterface) => {
  try {
    const response = await axios({
      method,
      url,
      data: body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    const response = (error as AxiosError).response;
    if (response?.status === 401) {
      return response.data;
    }
    console.log(error);
  }
};

export const loginUserAPI = async (userCredentials: AuthFormData) => {
  try {
    return fetcher({
      url: '/api/login',
      method: 'POST',
      body: userCredentials,
    });
  } catch (error) {
    console.log(error);
  }
};

export const registerUserAPI = async (userCredentials: AuthFormData) => {
  try {
    return fetcher({
      url: '/api/register',
      method: 'POST',
      body: userCredentials,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUserAPI = async () => {
  try {
    return fetcher({
      url: '/api/logout',
      method: 'POST',
      body: {},
    });
  } catch (error) {
    console.log(error);
  }
};

export const createProjectAPI = async (projectData: EventData) => {
  try {
    return fetcher({
      url: '/api/projects',
      method: 'POST',
      body: projectData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProjectAPI = async (projectData: EventData) => {
  try {
    return fetcher({
      url: `/api/projects/${projectData.id}`,
      method: 'POST',
      body: projectData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createTaskAPI = async (projectData: TasksDatabaseInterface) => {
  try {
    return fetcher({
      url: '/api/tasks',
      method: 'POST',
      body: projectData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const doneTaskAPI = async (id?: string) => {
  try {
    return fetcher({
      url: `/api/tasks/${id}`,
      method: 'PUT',
      body: {},
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTaskAPI = async (id: string | number | undefined) => {
  try {
    return fetcher({
      url: `/api/tasks/${id}`,
      method: 'DELETE',
      body: {},
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProjectAPI = async (id: string | number | undefined) => {
  try {
    return fetcher({
      url: `/api/projects/${id}`,
      method: 'DELETE',
      body: {},
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProfileAPI = async (profileData: ProfileData) => {
  try {
    return fetcher({
      url: '/api/profile',
      method: 'PUT',
      body: profileData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const closeProjectAPI = async (id?: string) => {
  try {
    return fetcher({
      url: `/api/projects/${id}`,
      method: 'PUT',
      body: {},
    });
  } catch (error) {
    console.log(error);
  }
};

export const createNoteAPI = async (noteData: NoteData) => {
  try {
    return fetcher({
      url: '/api/notes',
      method: 'POST',
      body: noteData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editNoteAPI = async (noteData: NoteData) => {
  try {
    return fetcher({
      url: `/api/notes/${noteData.id}`,
      method: 'POST',
      body: noteData,
    });
  } catch (error) {
    console.log(error);
  }
};
