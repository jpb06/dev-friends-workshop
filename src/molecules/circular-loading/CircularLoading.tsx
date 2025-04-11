import { CircularProgress } from '@mui/material';
import type { FunctionComponent } from 'react';

import { CenteredBlock } from '@molecules';

export const CircularLoading: FunctionComponent = () => (
  <CenteredBlock>
    <CircularProgress color="primary" size={100} title="circle-loading" />
  </CenteredBlock>
);
