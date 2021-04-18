import { AxiosError } from "axios";

import { CustomError } from "@owntypes/api.custom.error.interface";

export const handleAxiosError = (error: AxiosError): never => {
  if (!error.response) {
    throw new CustomError(500, "Internal server error");
  }
  throw new CustomError(
    error.response.status,
    error.response.data.message,
    error.response.data.details
  );
};
