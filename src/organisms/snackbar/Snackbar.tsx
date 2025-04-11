import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import type { FunctionComponent, SyntheticEvent } from 'react';

import type { SnackbarMessage } from './snackbar.types';

type SnackbarProps = {
  onClose: (_: Event | SyntheticEvent<unknown, Event>, reason?: string) => void;
  onExited: () => void;
  isOpen: boolean;
  messageInfo: SnackbarMessage | undefined;
};

export const Snackbar: FunctionComponent<SnackbarProps> = ({
  onClose,
  onExited,
  isOpen,
  messageInfo,
}) => (
  <MuiSnackbar
    key={messageInfo ? messageInfo.key : undefined}
    open={isOpen}
    autoHideDuration={6000}
    onClose={onClose}
    TransitionProps={{ onExited }}
  >
    <Alert
      onClose={onClose}
      severity={messageInfo?.severity}
      sx={{ width: '100%' }}
    >
      {messageInfo?.message}
    </Alert>
  </MuiSnackbar>
);
