import { Card, CardContent, Grid, Skeleton } from '@mui/material';

export const DevSkeleton = () => (
  <Grid item xs={12} sm={4} md={3}>
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
