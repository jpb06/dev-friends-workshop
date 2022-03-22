import { Grid, LinearProgress } from '@mui/material';
import React from 'react';

export const LinearLoading = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <LinearProgress
        color="secondary"
        title="linear-loading"
        sx={{ height: 8 }}
      />
    </Grid>
  </Grid>
);
