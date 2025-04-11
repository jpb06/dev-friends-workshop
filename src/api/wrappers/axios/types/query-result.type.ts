import type { QueryObserverResult } from '@tanstack/react-query';

import type { UnWrapResult } from './unwrap-result.type';

export type QueryResult<TSuccess, TError> = QueryObserverResult<
  UnWrapResult<TSuccess>,
  TError
>;
