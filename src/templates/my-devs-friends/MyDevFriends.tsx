import { CardActions, Grid } from '@mui/material';
import type { FunctionComponent } from 'react';

import { StatusReport } from './molecules/status-report/StatusReport';
import { SquadFilter, DevsList } from './organisms';

export const MyDevFriends: FunctionComponent = () => (
  <>
    <CardActions>
      <SquadFilter />
    </CardActions>
    <Grid
      container={true}
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
  </>
);
