import { createTheme } from '@mui/material';
import { amber, cyan, orange, red, teal } from '@mui/material/colors';

import type { AppTheme } from './types/app-theme.type';

export const appTheme: AppTheme = {
  ...createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: cyan[900],
      },
      secondary: {
        main: red[900],
      },
      background: { paper: '#1e1e3a' },
    },
  }),
  colors: {
    white: '#fff',
    amber: amber[800],
    cyan: cyan[300],
    darkCyan: cyan[900],
    orange: orange[600],
    lightRed: red[400],
    teal: teal[900],
  },
};
