import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import React from 'react';

export const DownTransition = React.forwardRef<unknown, TransitionProps>(
  (props: unknown, ref: React.Ref<unknown>) => (
    <Slide direction="down" ref={ref} {...props} />
  )
);
DownTransition.displayName = 'DownTransition';
