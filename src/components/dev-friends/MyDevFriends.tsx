import React, { useState } from "react";

import { CardActions, Grid } from "@material-ui/core";
import { Squad } from "@owntypes/squad.interface";

import { DevFriendsContext } from "./contexts/DevFriendsContext.context";
import { SquadFilter } from "./filter/SquadFilter";
import { DevsList } from "./list/DevsList";
import { useMyDevFriendsStyles } from "./MyDevFriends.styles";
import { StatusReport } from "./status-report/StatusReport";

export type DevFriendsStatus = "loading" | "errored" | "ready";

export const MyDevFriends = (): JSX.Element => {
  const classes = useMyDevFriendsStyles();
  const [status, setStatus] = useState<DevFriendsStatus>("loading");
  const [selectedSquads, setSelectedSquads] = useState<Array<Squad>>(undefined);

  return (
    <DevFriendsContext.Provider
      value={{ selectedSquads, setSelectedSquads, setStatus }}
    >
      <CardActions>
        <SquadFilter />
      </CardActions>
      <Grid
        container
        spacing={1}
        justify="center"
        alignItems="center"
        className={classes.list}
      >
        <DevsList />
        <StatusReport status={status} />
      </Grid>
    </DevFriendsContext.Provider>
  );
};
