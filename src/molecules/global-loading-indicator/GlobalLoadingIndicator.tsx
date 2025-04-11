import { LinearProgress } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';
import type { FunctionComponent } from 'react';

export const GlobalLoadingIndicator: FunctionComponent = () => {
  const isFetching = useIsFetching();
  if (!isFetching) {
    return null;
  }

  return (
    <LinearProgress color="primary" title="app-is-loading" sx={{ height: 8 }} />
  );
};
