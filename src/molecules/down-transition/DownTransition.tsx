import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

export const DownTransition = React.forwardRef<unknown, TransitionProps>(
  (props: unknown, ref: React.Ref<unknown>) => (
    <Slide direction="down" ref={ref} {...props} />
  )
);
DownTransition.displayName = 'DownTransition';
