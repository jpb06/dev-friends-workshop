import GroupIcon from '@mui/icons-material/Group';
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import type { FunctionComponent } from 'react';

import type { SquadDto } from '@api/main-backend/specs/api-types';
import { appTheme } from '@theme';

interface SquadChoiceProps extends SquadDto {
  onSquadSelected: (id: number) => Promise<void>;
  membersCount: number;
}

export const SquadChoice: FunctionComponent<SquadChoiceProps> = ({
  onSquadSelected,
  id,
  name,
  membersCount,
}) => {
  const handleClick = () => onSquadSelected(id);

  return (
    <ListItemButton onClick={handleClick}>
      <ListItemAvatar>
        <Avatar
          sx={{
            backgroundColor: appTheme.colors.darkCyan,
          }}
        >
          <GroupIcon color="primary" sx={{ color: appTheme.colors.white }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={`${membersCount} members`}
        secondaryTypographyProps={{ color: appTheme.colors.cyan }}
      />
    </ListItemButton>
  );
};
