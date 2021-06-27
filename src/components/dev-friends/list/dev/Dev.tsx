import React from 'react';

import { Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import { Dev as DevType } from '@owntypes/dev.interface';

import { useDevStyles } from './Dev.styles';
import { getDevDescription } from './logic/getDevDescription';

interface DevProps extends DevType {
  onSelected: (id: number) => void;
}

export const Dev: React.FC<DevProps> = ({
  onSelected,
  id,
  firstName,
  squad,
}): JSX.Element => {
  const classes = useDevStyles();

  const description = getDevDescription({ firstName, squad });

  const HandleClick = () => onSelected(id);

  return (
    <Grid item xs={4}>
      <Card className={classes.card} role="dev" title={description}>
        <CardMedia
          className={classes.media}
          image={`https://picsum.photos/seed/${firstName}/300`}
          role="img"
          title={firstName}
          onClick={HandleClick}
        />
        <CardContent>{description}</CardContent>
      </Card>
    </Grid>
  );
};
