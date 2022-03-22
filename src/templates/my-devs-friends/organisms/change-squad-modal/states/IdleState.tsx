import { List } from '@mui/material';
import { CircularLoading } from 'molecules/circular-loading/CircularLoading';
import React from 'react';

import { useDevsQuery, useSquadsQuery } from '@api/main-backend';
import { DevDto } from '@api/main-backend/specs/api-types';

import { SquadChoice } from './squad-choice/SquadChoice';

interface IdleStateProps {
  onSquadChanged: (id: number) => void;
  dev: DevDto;
}

export const IdleState: React.FC<IdleStateProps> = ({
  onSquadChanged,
  dev,
}) => {
  const { data: squads, isLoading: isSquadsLoading } = useSquadsQuery();
  const { data: devs, isLoading: isDevsLoading } = useDevsQuery();

  const isLoading = isSquadsLoading || isDevsLoading;
  if (isLoading) return <CircularLoading />;

  return (
    <>
      <>
        {dev.firstName} currently belongs to squad {dev.squad}
      </>
      <List aria-label="Squads list">
        {squads
          .filter((squad) => squad.id !== dev.squad)
          .map((squad) => (
            <SquadChoice
              onSquadSelected={onSquadChanged}
              key={squad.id}
              membersCount={devs.filter((el) => el.squad === squad.id).length}
              {...squad}
            />
          ))}
      </List>
    </>
  );
};
