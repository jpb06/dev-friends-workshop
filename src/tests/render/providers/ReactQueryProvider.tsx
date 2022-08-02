import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';

import { TestWrapper } from './types/test-wrapper.type';

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
    /*eslint-disable*/
    logger: {
      log: console.log,
      warn: console.warn,
      error: jest.fn(),
    },
    /*eslint-enable*/
  });
};

export const ReactQueryProvider =
  (): TestWrapper =>
  ({ children }: PropsWithChildren<unknown>) => {
    // Create client in render to prevent cache sharing accross the tests
    const queryClient = createTestQueryClient();

    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
