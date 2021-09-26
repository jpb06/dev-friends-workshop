import { CustomError } from '@type/api.custom.error.interface';

interface AxiosTerseResponse {
  status: number;
  data: {
    message: string;
    details: unknown;
  };
}

interface AxiosTerseError {
  response?: AxiosTerseResponse;
}

export const handleAxiosError = (error: AxiosTerseError): never => {
  if (!error.response) {
    throw new CustomError(500, 'Internal server error');
  }

  throw new CustomError(
    error.response.status,
    error.response.data.message,
    error.response.data.details
  );
};
