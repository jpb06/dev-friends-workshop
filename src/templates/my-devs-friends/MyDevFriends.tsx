import { CardActions, Grid } from '@mui/material';
import React, { useState } from 'react';

import { DevFriendsContextProvider } from './contexts/DevFriendsContext';
import { StatusReport } from './molecules/status-report/StatusReport';
import { SquadFilter } from './organisms/filter/SquadFilter';
import { DevsList } from './organisms/list/DevsList';

export type DevFriendsStatus = 'loading' | 'errored' | 'ready';

export const MyDevFriends = () => {
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
        sx={{
          marginTop: 10,
          padding: 10,
        }}
      >
        <DevsList />
        <StatusReport status={status} />
      </Grid>
    </DevFriendsContextProvider>
  );
};
