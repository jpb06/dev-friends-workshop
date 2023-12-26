import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';

import { appTheme } from '../../../theme/app-theme';

import type { TestWrapper } from './types/test-wrapper.type';

export const ThemeProvider =
  (): TestWrapper =>
  // eslint-disable-next-line react/display-name
  ({ children }: PropsWithChildren) => (
    <MuiThemeProvider theme={appTheme}>{children}</MuiThemeProvider>
  );
