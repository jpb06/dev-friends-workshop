import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Zoom,
} from '@mui/material';

import type { DevDto } from '@api/main-backend/specs/api-types';
import { appTheme } from '@theme';

import { useSquadsQuery } from '../../../../../api/main-backend';

import { useDevDescription } from './hooks/useDevDescription';

interface DevProps extends DevDto {
  onSelected: (id: number) => void;
}

export const Dev = ({
  onSelected,
  id,
  idSquad,
  firstName,
  avatar,
}: DevProps) => {
  const { data: squads } = useSquadsQuery();

  const { squad, description } = useDevDescription(idSquad, firstName, squads);

  const handleClick = () => {
    onSelected(id);
  };

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Zoom in unmountOnExit mountOnEnter>
        <Card
          role="listitem"
          title={description}
          sx={{
            backgroundColor: '#0d3c59',
          }}
        >
          <CardMedia
            image={avatar}
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
            <Typography variant="body2" sx={{ color: appTheme.colors.cyan }}>
              {squad}
            </Typography>
          </CardContent>
        </Card>
      </Zoom>
    </Grid>
  );
};
