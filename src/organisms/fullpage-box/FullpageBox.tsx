import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  alpha,
} from '@mui/material';
import type { FunctionComponent, PropsWithChildren } from 'react';

import { Brand, GlobalLoadingIndicator } from '@molecules';

export const FullpageBox: FunctionComponent<PropsWithChildren> = ({
  children,
}) => (
  <Grid
    container={true}
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{
      minHeight: '100vh',
      backgroundSize: 'cover',
      padding: 2,
    }}
  >
    <Card
      sx={{
        width: '100%',
        paddingBottom: 2,
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.88),
        borderRadius: 4,
        maxWidth: 900,
      }}
    >
      <CardMedia
        sx={{
          height: 150,
        }}
        image="/img/banner.jpg"
      />
      <GlobalLoadingIndicator />
      <CardContent>
        <Grid container={true} justifyContent="center" direction="row">
          <Brand color="amber" centered={true} big={true} />
        </Grid>
      </CardContent>
      <CardActions
        sx={{
          paddingTop: 0,
          justifyContent: 'center',
        }}
      >
        <Grid
          container={true}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Grid>
      </CardActions>
    </Card>
  </Grid>
);
