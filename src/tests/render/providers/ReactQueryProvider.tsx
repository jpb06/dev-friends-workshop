import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

import type { TestWrapper } from './types/test-wrapper.type';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

export const ReactQueryProvider =
  (): TestWrapper =>
  // eslint-disable-next-line react/display-name
  ({ children }: PropsWithChildren<unknown>) => {
    // Create client in render to prevent cache sharing accross the tests
    const queryClient = createTestQueryClient();

    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
