import React, { useState } from 'react';

import { SquadDto } from '@api/main-backend/specs/api-types';

import { DevFriendsStatus } from '../MyDevFriends';

export const DevFriendsContext = React.createContext<{
  selectedSquads: Array<SquadDto>;
  setSelectedSquads: React.Dispatch<Array<SquadDto>>;
  status: DevFriendsStatus;
  setStatus: React.Dispatch<React.SetStateAction<DevFriendsStatus>>;
}>(undefined);

interface DevFriendsContextProviderProps {}

export const DevFriendsContextProvider: React.FC<
  DevFriendsContextProviderProps
> = ({ children }) => {
  const [status, setStatus] = useState<DevFriendsStatus>('loading');
  const [selectedSquads, setSelectedSquads] = useState<SquadDto[]>(undefined);

  return (
    <DevFriendsContext.Provider
      value={{
        selectedSquads,
        setSelectedSquads,
        status,
        setStatus,
      }}
    >
      {children}
    </DevFriendsContext.Provider>
  );
};
