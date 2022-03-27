import React, { SetStateAction, useState, Dispatch } from 'react';

import { SquadDto } from '@api/main-backend/specs/api-types';

import { DevFriendsStatus } from '../MyDevFriends';

export const DevFriendsContext = React.createContext<{
  selectedSquads: Array<SquadDto>;
  setSelectedSquads: React.Dispatch<Array<SquadDto>>;
  setStatus: React.Dispatch<React.SetStateAction<DevFriendsStatus>>;
}>(undefined);

interface DevFriendsContextProviderProps {
  setStatus: Dispatch<SetStateAction<DevFriendsStatus>>;
}

export const DevFriendsContextProvider: React.FC<
  DevFriendsContextProviderProps
> = ({ children, setStatus }) => {
  const [selectedSquads, setSelectedSquads] = useState<SquadDto[]>(undefined);

  return (
    <DevFriendsContext.Provider
      value={{
        selectedSquads,
        setSelectedSquads,
        setStatus,
      }}
    >
      {children}
    </DevFriendsContext.Provider>
  );
};
