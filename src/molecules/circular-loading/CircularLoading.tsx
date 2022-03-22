import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

export const CircularLoading = () => (
  <Grid
    container
    spacing={1}
    justifyContent="center"
    alignItems="center"
    sx={{ padding: 50 }}
  >
    <CircularProgress color="secondary" size={100} title="circle-loading" />
  </Grid>
);
