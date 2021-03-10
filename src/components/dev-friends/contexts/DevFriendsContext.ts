import React from "react";

import { Squad } from "@owntypes/squad.interface";

import { DevFriendsStatus } from "../MyDevFriends";

export const DevFriendsContext = React.createContext<{
  selectedSquads: Array<Squad>;
  setSelectedSquads: React.Dispatch<Array<Squad>>;
  setStatus: React.Dispatch<React.SetStateAction<DevFriendsStatus>>;
}>(undefined);
