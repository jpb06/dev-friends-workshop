import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { PropsWithChildren } from 'react';

import { appTheme } from '../../../theme/app-theme';
import { WrapperResult } from './types/wrapper-result.type';

export const ThemeProvider = (): WrapperResult => {
  const Wrapper = ({ children }: PropsWithChildren<unknown>) => (
    <MuiThemeProvider theme={appTheme}>{children}</MuiThemeProvider>
  );

  return { wrapper: Wrapper };
};
