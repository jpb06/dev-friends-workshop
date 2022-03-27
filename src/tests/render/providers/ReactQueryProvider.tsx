import React from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

import { WrapperResult } from './types/wrapper-result.type';

//https://react-query.tanstack.com/guides/testing#_top
/*eslint-disable*/
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
})
/*eslint-unable*/

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  })

interface ReactQueryProviderProps extends WrapperResult {
  queryClient: QueryClient
} 

export const ReactQueryProvider = (): ReactQueryProviderProps => {
  // Create client in render to prevent cache sharing accross the tests
  const queryClient = createTestQueryClient()

  const wrapper: React.FC = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return { queryClient, wrapper }
}
