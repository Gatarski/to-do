import axios, { AxiosError } from 'axios';
import { AuthFormData, EventData } from '@/util/common';

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
