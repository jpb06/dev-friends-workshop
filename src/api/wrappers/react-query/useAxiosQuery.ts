import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { Method } from 'axios';

import { axiosRequest } from '../axios/axios-request';
import type { QueryResult } from '../axios/types/query-result.type';
import type { UnWrapResult } from '../axios/types/unwrap-result.type';

interface AxiosQueryParams<TSuccess, TError> {
  key: unknown[];
  url: string;
  method: Method;
  data?: unknown;
  options?: Omit<UseQueryOptions<UnWrapResult<TSuccess>, TError>, 'queryKey'>;
}

export const useAxiosQuery = <TSuccess, TError>({
  key,
  url,
  method,
  data,
  options,
}: AxiosQueryParams<TSuccess, TError>): QueryResult<TSuccess, TError> =>
  useQuery<UnWrapResult<TSuccess> | undefined, TError, UnWrapResult<TSuccess>>({
    queryKey: key,
    queryFn: () => axiosRequest<TSuccess>({ method, url, data }),
    ...options,
  });
