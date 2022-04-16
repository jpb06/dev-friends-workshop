import { Method } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { axiosRequest } from '../axios/axios-request';
import { QueryResult } from '../axios/types/query-result.type';
import { UnWrapResult } from '../axios/types/unwrap-result.type';

type AxiosQueryParams<TSuccess, TError> = {
  key: Array<unknown>;
  url: string;
  method: Method;
  data?: unknown;
  options?: Omit<UseQueryOptions<UnWrapResult<TSuccess>, TError>, 'queryKey'>;
};

export const useAxiosQuery = <TSuccess, TError>({
  key,
  url,
  method,
  data,
  options,
}: AxiosQueryParams<TSuccess, TError>): QueryResult<TSuccess, TError> =>
  useQuery<UnWrapResult<TSuccess> | undefined, TError, UnWrapResult<TSuccess>>(
    key,
    () => axiosRequest<TSuccess>({ method, url, data }),
    options
  );
