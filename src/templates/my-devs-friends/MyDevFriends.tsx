import { CardActions, Grid } from '@mui/material';
import React from 'react';

import { DevFriendsContextProvider } from './contexts/DevFriendsContext';
import { StatusReport } from './molecules/status-report/StatusReport';
import { SquadFilter, DevsList } from './organisms';

export type DevFriendsStatus = 'loading' | 'errored' | 'ready';

export const MyDevFriends = () => {
  return (
    <DevFriendsContextProvider>
      <CardActions>
        <SquadFilter />
      </CardActions>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          padding: 1,
        }}
      >
        <DevsList />
        <StatusReport />
      </Grid>
    </DevFriendsContextProvider>
  );
};
