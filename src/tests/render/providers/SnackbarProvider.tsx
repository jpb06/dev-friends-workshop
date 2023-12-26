import type { PropsWithChildren } from 'react';

import { WithSnackbar } from '@organisms';

import type { TestWrapper } from './types/test-wrapper.type';

export const SnackbarProvider =
  (): TestWrapper =>
  // eslint-disable-next-line react/display-name
  ({ children }: PropsWithChildren<unknown>) => (
    <WithSnackbar>{children}</WithSnackbar>
  );
