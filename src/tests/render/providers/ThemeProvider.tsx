import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { PropsWithChildren } from 'react';

import { TestWrapper } from './types/test-wrapper.type';
import { appTheme } from '../../../theme/app-theme';

export const ThemeProvider =
  (): TestWrapper =>
  ({ children }: PropsWithChildren<unknown>) =>
    <MuiThemeProvider theme={appTheme}>{children}</MuiThemeProvider>;
