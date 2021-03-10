import { useContext, useEffect } from "react";

import { Squad } from "@owntypes/squad.interface";

import { DevFriendsContext } from "../../contexts/DevFriendsContext";

export const useSelectedSquadsInitialization = (squads: Array<Squad>): void => {
  const { setSelectedSquads } = useContext(DevFriendsContext);

  useEffect(() => {
    if (squads !== undefined) {
      setSelectedSquads(squads);
    }
  }, [squads]);
};
