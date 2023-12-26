import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Method } from 'axios';

import { axiosRequest } from '../axios/axios-request';
import { MutationResult } from '../axios/types/mutation-result.type';
import { UnWrapResult } from '../axios/types/unwrap-result.type';

interface AxiosMutationParams<TSuccess, TError, TBody> {
  url: string;
  method: Method;
  options?: Omit<
    UseMutationOptions<UnWrapResult<TSuccess>, TError, TBody>,
    'mutationFn'
  >;
}

export const useAxiosMutation = <TSuccess, TError, TBody>({
  url,
  method,
  options,
}: AxiosMutationParams<TSuccess, TError, TBody>): MutationResult<
  TSuccess,
  TError,
  TBody
> =>
  useMutation<UnWrapResult<TSuccess> | undefined, TError, TBody>({
    mutationFn: (data: TBody) => axiosRequest<TSuccess>({ method, url, data }),
    ...options,
  });
