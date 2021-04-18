import React from "react";

import { useDevsQuery } from "@api/main-backend/useDevsQuery";
import { useSquadsQuery } from "@api/main-backend/useSquadsQuery";
import { CircularLoading } from "@components/generic/circular-loading/CircularLoading";
import { List } from "@material-ui/core";
import { Dev } from "@owntypes/dev.interface";

import { SquadChoice } from "./squad-choice/SquadChoice";

interface IdleStateProps {
  onSquadChanged: (id: number) => void;
  dev: Dev;
}

export const IdleState: React.FC<IdleStateProps> = ({
  onSquadChanged,
  dev,
}): JSX.Element => {
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
