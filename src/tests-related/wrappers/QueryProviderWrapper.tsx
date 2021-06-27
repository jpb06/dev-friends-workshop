import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { getQueryClient } from './queryClient';

interface QueryProviderWrapperResult {
  wrapper: ({ children }) => JSX.Element;
  queryClient: QueryClient;
}

const queryClient = getQueryClient();

export const QueryProviderWrapper = (): QueryProviderWrapperResult => {
  const wrapper = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  return { wrapper, queryClient };
};
