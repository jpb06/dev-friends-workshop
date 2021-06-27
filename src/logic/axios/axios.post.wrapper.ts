import axios from 'axios';

import { handleAxiosError } from './axios.errors.handler';

export const axiosPost = async <TResult>(
  url: string,
  body: unknown
): Promise<TResult> => {
  try {
    const result = await axios.post<TResult>(url, body);
    return result.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
