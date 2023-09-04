import axios, { AxiosError } from 'axios';
import { AuthFormData, EventData } from '@/utils/common';
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

export const loginAPI = async (userCredentials: AuthFormData) => {
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

export const registerAPI = async (userCredentials: AuthFormData) => {
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

export const logoutAPI = async () => {
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

export const postProjectAPI = async (projectData: EventData) => {
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

export const postTaskAPI = async (projectData: TasksDatabaseInterface) => {
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
