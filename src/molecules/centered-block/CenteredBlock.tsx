import { Grid, Zoom } from '@mui/material';

type CenteredBlockProps = {
  children: React.ReactElement<unknown>;
};

export const CenteredBlock = ({ children }: CenteredBlockProps) => (
  <Grid
    container
    spacing={1}
    justifyContent="center"
    alignItems="center"
    sx={{ padding: 5 }}
  >
    <Zoom in>{children}</Zoom>
  </Grid>
);
