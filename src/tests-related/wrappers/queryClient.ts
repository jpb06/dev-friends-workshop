import { QueryClient } from 'react-query';

export const getQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
      },
      mutations: {
        retry: false,
      },
    },
  });
