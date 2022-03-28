import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

import { appTheme } from '@theme';

type Props = Record<never, never>;

export const AppThemeProvider = ({ children }: PropsWithChildren<Props>) => (
  <MuiThemeProvider theme={appTheme}>{children}</MuiThemeProvider>
);
