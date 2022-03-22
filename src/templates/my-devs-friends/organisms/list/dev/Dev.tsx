import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import React from 'react';

import { DevDto } from '@api/main-backend/specs/api-types';

import { getDevDescription } from './logic/getDevDescription';

interface DevProps extends DevDto {
  onSelected: (id: number) => void;
}

export const Dev: React.FC<DevProps> = ({
  onSelected,
  id,
  firstName,
  squad,
}) => {
  const description = getDevDescription({ firstName, squad });

  const HandleClick = () => onSelected(id);

  return (
    <Grid item xs={4}>
      <Card
        role="dev"
        title={description}
        sx={{
          backgroundColor: '#0d3c59',
        }}
      >
        <CardMedia
          image={`https://picsum.photos/seed/${firstName}/300`}
          role="img"
          title={firstName}
          onClick={HandleClick}
          sx={{
            height: 100,
          }}
        />
        <CardContent>{description}</CardContent>
      </Card>
    </Grid>
  );
};
