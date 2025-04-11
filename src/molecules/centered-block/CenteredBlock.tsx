import { Grid, Zoom } from '@mui/material';
import type { FunctionComponent, PropsWithChildren } from 'react';

export const CenteredBlock: FunctionComponent<PropsWithChildren> = ({
  children,
}) => (
  <Grid
    container={true}
    spacing={1}
    justifyContent="center"
    alignItems="center"
    sx={{ padding: 5 }}
  >
    <Zoom in={true}>{children as never}</Zoom>
  </Grid>
);
