import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import React from 'react';

import { Squad } from '@type/squad.interface';

import { useSquadChoiceStyles } from './SquadChoice.styles';

interface SquadChoiceProps extends Squad {
  onSquadSelected: (id: number) => void;
  membersCount: number;
}

export const SquadChoice: React.FC<SquadChoiceProps> = ({
  onSquadSelected,
  id,
  squad,
  membersCount,
}): JSX.Element => {
  const classes = useSquadChoiceStyles();

  const handleClick = () => onSquadSelected(id);

  return (
    <ListItem button onClick={handleClick}>
      <ListItemAvatar>
        <Avatar className={classes.icon}>
          <GroupIcon color="primary" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`Squad ${squad}`}
        secondary={`${membersCount} members`}
      />
    </ListItem>
  );
};
