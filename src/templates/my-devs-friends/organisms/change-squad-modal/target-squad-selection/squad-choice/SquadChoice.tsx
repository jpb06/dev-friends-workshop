import GroupIcon from '@mui/icons-material/Group';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react';

import { SquadDto } from '@api/main-backend/specs/api-types';
import { appTheme } from '@theme';

interface SquadChoiceProps extends SquadDto {
  onSquadSelected: (id: number) => void;
  membersCount: number;
}

export const SquadChoice = ({
  onSquadSelected,
  id,
  squad,
  membersCount,
}: SquadChoiceProps) => {
  const handleClick = () => onSquadSelected(id);

  return (
    <ListItem button onClick={handleClick}>
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
        primary={`Squad ${squad}`}
        secondary={`${membersCount} members`}
        secondaryTypographyProps={{ color: appTheme.colors.cyan }}
      />
    </ListItem>
  );
};
