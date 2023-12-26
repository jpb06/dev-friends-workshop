import { CircularProgress } from '@mui/material';

import { CenteredBlock } from '@molecules';

export const CircularLoading = () => (
  <CenteredBlock>
    <CircularProgress color="primary" size={100} title="circle-loading" />
  </CenteredBlock>
);
