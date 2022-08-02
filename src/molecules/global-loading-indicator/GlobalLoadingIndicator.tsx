import { LinearProgress } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';

export const GlobalLoadingIndicator = () => {
  const isFetching = useIsFetching();

  if (!isFetching) {
    return null;
  }

  return (
    <LinearProgress color="primary" title="app-is-loading" sx={{ height: 8 }} />
  );
};
