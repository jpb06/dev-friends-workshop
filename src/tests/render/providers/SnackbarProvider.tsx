import React, { PropsWithChildren } from 'react';

import { WithSnackbar } from '@organisms';

import { WrapperResult } from './types/wrapper-result.type';

export const SnackbarProvider = (): WrapperResult => {
  const Wrapper = ({ children }: PropsWithChildren<unknown>) => (
    <WithSnackbar>{children}</WithSnackbar>
  );

  return { wrapper: Wrapper };
};
