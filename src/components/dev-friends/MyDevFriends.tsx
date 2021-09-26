import { CardActions, Grid } from '@material-ui/core';
import React, { useState } from 'react';

import { useMyDevFriendsStyles } from './MyDevFriends.styles';
import { DevFriendsContextProvider } from './contexts/DevFriendsContext';
import { SquadFilter } from './filter/SquadFilter';
import { DevsList } from './list/DevsList';
import { StatusReport } from './status-report/StatusReport';

export type DevFriendsStatus = 'loading' | 'errored' | 'ready';

export const MyDevFriends = (): JSX.Element => {
  const classes = useMyDevFriendsStyles();
  const [status, setStatus] = useState<DevFriendsStatus>('loading');

  return (
    <DevFriendsContextProvider setStatus={setStatus}>
      <CardActions>
        <SquadFilter />
      </CardActions>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        className={classes.list}
      >
        <DevsList />
        <StatusReport status={status} />
      </Grid>
    </DevFriendsContextProvider>
  );
};
