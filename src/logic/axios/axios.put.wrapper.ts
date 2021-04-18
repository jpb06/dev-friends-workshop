import axios from "axios";

import { handleAxiosError } from "./axios.errors.handler";

export const axiosPut = async <TResult>(
  url: string,
  body: unknown
): Promise<TResult> => {
  try {
    const result = await axios.put<TResult>(url, body);
    return result.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
