import { List } from '@mui/material';
import React from 'react';

import { useDevsQuery, useSquadsQuery } from '@api/main-backend';
import { DevDto } from '@api/main-backend/specs/api-types';
import { CircularLoading } from '@molecules';

import { ErrorBlock } from './../../../molecules/error-block/ErrorBlock';
import { SquadChoice } from './squad-choice/SquadChoice';

interface IdleStateProps {
  onSquadChanged: (id: number) => void;
  dev: DevDto;
}

export const IdleState: React.FC<IdleStateProps> = ({
  onSquadChanged,
  dev,
}) => {
  const {
    data: squads,
    isLoading: isSquadsLoading,
    isError: isSquadsError,
  } = useSquadsQuery();
  const {
    data: devs,
    isLoading: isDevsLoading,
    isError: isDevsError,
  } = useDevsQuery();

  const isLoading = isSquadsLoading || isDevsLoading;
  if (isLoading) return <CircularLoading />;

  const isError = isDevsError || isSquadsError;
  if (isError) {
    return (
      <ErrorBlock title="Oh no!">Something went wrong... Sorry!</ErrorBlock>
    );
  }

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
