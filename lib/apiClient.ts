import axios, { AxiosError } from 'axios';
import { AuthFormData } from '@/types/common';

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
