import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';

import { useCircularLoadingStyles } from './CircularLoading.styles';

export const CircularLoading = (): JSX.Element => {
  const classes = useCircularLoadingStyles();

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <CircularProgress color="secondary" size={100} title="circle-loading" />
    </Grid>
  );
};
