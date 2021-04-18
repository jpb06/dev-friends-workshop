import { AxiosRequestConfig } from "axios";
import axios from "axios";

import { handleAxiosError } from "./axios.errors.handler";

export const axiosGet = async <TResult>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResult> => {
  try {
    const result = await axios.get<TResult>(url, config);
    return result.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
