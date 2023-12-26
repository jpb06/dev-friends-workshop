import { List } from '@mui/material';

import { useDevsQuery, useSquadsQuery } from '@api/main-backend';
import type { DevDto, SquadDto } from '@api/main-backend/specs/api-types';
import { CircularLoading } from '@molecules';

import { ErrorBlock } from '../../../molecules/error-block/ErrorBlock';

import { SquadChoice } from './squad-choice/SquadChoice';

interface TargetSquadSelectionProps {
  onSquadChanged: (id: number) => Promise<void>;
  dev: DevDto;
}

export const TargetSquadSelection = ({
  onSquadChanged,
  dev,
}: TargetSquadSelectionProps) => {
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

  const squad = squads.data!.find((s) => s.id === dev.idSquad) as SquadDto;

  return (
    <>
      <>
        {dev.firstName} currently belongs to squad {squad.name}
      </>
      <List aria-label="Squads list">
        {squads
          .data!.filter((squad) => squad.id !== dev.idSquad)
          .map((squad) => (
            <SquadChoice
              onSquadSelected={onSquadChanged}
              key={squad.id}
              membersCount={
                devs.data!.filter((el) => el.idSquad === squad.id).length
              }
              {...squad}
            />
          ))}
      </List>
    </>
  );
};
