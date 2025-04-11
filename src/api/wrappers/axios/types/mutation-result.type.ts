import type { UseMutationResult } from '@tanstack/react-query';

import type { UnWrapResult } from './unwrap-result.type';

export type MutationResult<TData, TError, TVariables> = UseMutationResult<
  UnWrapResult<TData> | undefined,
  TError,
  TVariables
>;
