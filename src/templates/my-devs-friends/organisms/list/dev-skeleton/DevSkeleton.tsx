import { Card, CardContent, Grid, Skeleton } from '@mui/material';
import type { FunctionComponent } from 'react';

export const DevSkeleton: FunctionComponent = () => (
  <Grid size={{ xs: 12, md: 3, sm: 4 }}>
    <Card
      sx={{
        backgroundColor: '#0d3c59',
      }}
    >
      <Skeleton sx={{ height: 100 }} animation="wave" variant="rectangular" />
      <CardContent>
        <Skeleton
          animation="wave"
          height={16}
          width="60%"
          style={{ marginTop: 4, marginBottom: 6 }}
        />
        <Skeleton
          animation="wave"
          height={16}
          width="40%"
          style={{ marginBottom: 6 }}
        />
      </CardContent>
    </Card>
  </Grid>
);
