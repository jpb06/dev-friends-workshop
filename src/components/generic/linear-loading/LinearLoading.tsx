import { Grid, LinearProgress } from '@material-ui/core';
import React from 'react';

import { useLinearLoadingStyles } from './LinearLoading.styles';

export const LinearLoading = (): JSX.Element => {
  const classes = useLinearLoadingStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <LinearProgress
          color="secondary"
          className={classes.progress}
          title="linear-loading"
        />
      </Grid>
    </Grid>
  );
};
