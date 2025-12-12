import { Slide } from '@mui/material';
import React from 'react';

export const DownTransition = React.forwardRef(
  (props: { children: React.ReactElement }, ref: React.Ref<unknown>) => (
    <Slide direction="down" ref={ref} {...props}>
      {props.children}
    </Slide>
  ),
);
DownTransition.displayName = 'DownTransition';
