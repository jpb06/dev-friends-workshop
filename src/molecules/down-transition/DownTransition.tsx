import { Slide } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import React from 'react';

export const DownTransition = React.forwardRef<unknown, TransitionProps>(
  (props: { children: React.ReactElement }, ref: React.Ref<unknown>) => (
    <Slide direction="down" ref={ref} {...props}>
      {props.children}
    </Slide>
  ),
);
DownTransition.displayName = 'DownTransition';
