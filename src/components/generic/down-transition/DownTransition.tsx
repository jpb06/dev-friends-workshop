import React from 'react';

import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

export const DownTransition = React.forwardRef<unknown, TransitionProps>(
  (props: unknown, ref: React.Ref<unknown>) => (
    <Slide direction="down" ref={ref} {...props} />
  )
);
DownTransition.displayName = "DownTransition";
