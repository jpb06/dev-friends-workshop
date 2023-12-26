import axios, { AxiosRequestConfig, Method, isAxiosError } from 'axios';

import { delay } from '@logic/delay';

import { mainBackendUrl } from '../../main-backend/main-backend-url.constant';

import { UnWrapResult } from './types/unwrap-result.type';

interface AxiosRequestProps {
  url: string;
  method: Method;
  data?: unknown;
  config?: AxiosRequestConfig;
}

interface WithResult<T> {
  result?: T;
  status?: number;
}

export const axiosRequest = async <TResult>({
  url,
  method,
  data = {},
  config = {},
}: AxiosRequestProps): Promise<UnWrapResult<TResult> | undefined> => {
  try {
    const [response] = await Promise.all([
      axios.request<WithResult<UnWrapResult<TResult>>>({
        method,
        url: `${mainBackendUrl}${url}`,
        data,
        ...config,
      }),
      delay(500), // ensuring every operation takes at least half a sec
    ]);

    if (response.data.result === undefined) {
      throw new Error(`${method} ${url} returned no result`);
    }

    return response.data.result;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.data.result !== undefined) {
        throw error.response?.data.result;
      }

      throw error.response?.data;
    }

    throw error;
  }
};
