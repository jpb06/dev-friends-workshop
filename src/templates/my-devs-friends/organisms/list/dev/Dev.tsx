import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Zoom,
} from '@mui/material';
import React from 'react';

import { DevDto } from '@api/main-backend/specs/api-types';
import { appTheme } from '@theme';

import { getDevDescription } from './logic/getDevDescription';

interface DevProps extends DevDto {
  onSelected: (id: number) => void;
}

export const Dev = ({ onSelected, id, firstName, squad }: DevProps) => {
  const description = getDevDescription({ firstName, squad });

  const handleClick = () => {
    onSelected(id);
  };

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Zoom in unmountOnExit mountOnEnter>
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
            onClick={handleClick}
            sx={{
              height: 100,
              cursor: 'pointer',
            }}
          />
          <CardContent>
            <Typography variant="body1" sx={{ color: appTheme.colors.amber }}>
              {firstName}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: appTheme.colors.cyan }}
            >{`Squad ${squad}`}</Typography>
          </CardContent>
        </Card>
      </Zoom>
    </Grid>
  );
};
