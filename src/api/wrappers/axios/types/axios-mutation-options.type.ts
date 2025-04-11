import type { UseMutationOptions } from '@tanstack/react-query';

import type { UnWrapResult } from './unwrap-result.type';

export type AxiosMutationOptions<TData, TError, TVariables> = Omit<
  UseMutationOptions<UnWrapResult<TData> | undefined, TError, TVariables>,
  'mutationFn'
>;
