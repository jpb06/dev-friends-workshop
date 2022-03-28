import { List } from '@mui/material';
import React from 'react';

import { useDevsQuery, useSquadsQuery } from '@api/main-backend';
import { DevDto } from '@api/main-backend/specs/api-types';
import { CircularLoading } from '@molecules';

import { ErrorBlock } from '../../../molecules/error-block/ErrorBlock';
import { SquadChoice } from './squad-choice/SquadChoice';

interface TargetSquadSelectionProps {
  onSquadChanged: (id: number) => void;
  dev: DevDto;
}

export const TargetSquadSelection: React.FC<TargetSquadSelectionProps> = ({
  onSquadChanged,
  dev,
}) => {
  const squads = useSquadsQuery();
  const devs = useDevsQuery();

  const isLoading = squads.isLoading || devs.isLoading;
  if (isLoading) {
    return <CircularLoading />;
  }

  const isError = squads.isError || devs.isError;
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
        {squads.data
          .filter((squad) => squad.id !== dev.squad)
          .map((squad) => (
            <SquadChoice
              onSquadSelected={onSquadChanged}
              key={squad.id}
              membersCount={
                devs.data.filter((el) => el.squad === squad.id).length
              }
              {...squad}
            />
          ))}
      </List>
    </>
  );
};
