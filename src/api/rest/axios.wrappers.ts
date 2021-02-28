import axios from "axios";

export const post = async <TResult>(
  url: string,
  body: unknown
): Promise<TResult> => {
  try {
    const result = await axios.post<TResult>(url, body);
    return result.data;
  } catch (error) {
    throw { status: error.response.status, data: error.response.data };
  }
};
