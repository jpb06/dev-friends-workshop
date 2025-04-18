import type { AlertColor } from '@mui/material';
import type {
  FunctionComponent,
  PropsWithChildren,
  SyntheticEvent,
} from 'react';
import React, { createContext, useState } from 'react';

import { Snackbar } from './Snackbar';
import type { SnackbarMessage } from './snackbar.types';

export type ShowSnackbarFn = (message: string, severity: AlertColor) => void;

const defaultFunction: ShowSnackbarFn = (_: string, __: AlertColor) => {
  console.error(
    "Snackbar context wasn't properly initialized (WithSnackbar is not a parent of the component)",
  );
};

export const SnackbarContext = createContext(defaultFunction);

export const WithSnackbar: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined,
  );

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const showSnackbar = (message: string, severity: AlertColor): void => {
    setSnackPack((prev) => [
      ...prev,
      { message, severity, key: new Date().getTime() },
    ]);
  };

  const handleClose = (
    _: Event | SyntheticEvent<unknown, Event>,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = (): void => {
    setMessageInfo(undefined);
  };

  return (
    <>
      <SnackbarContext.Provider value={showSnackbar}>
        {children}
      </SnackbarContext.Provider>
      <Snackbar
        onExited={handleExited}
        onClose={handleClose}
        isOpen={open}
        messageInfo={messageInfo}
      />
    </>
  );
};
