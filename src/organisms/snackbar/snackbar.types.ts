import type { AlertColor } from '@mui/material';

export type SnackbarMessage = {
  message: string;
  severity: AlertColor;
  key: number;
};
