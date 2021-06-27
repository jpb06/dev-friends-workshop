import React, { SetStateAction, useState } from 'react';
import { Dispatch } from 'react';

import { Squad } from '@owntypes/squad.interface';

import { DevFriendsStatus } from '../MyDevFriends';

export const DevFriendsContext = React.createContext<{
  selectedSquads: Array<Squad>;
  setSelectedSquads: React.Dispatch<Array<Squad>>;
  setStatus: React.Dispatch<React.SetStateAction<DevFriendsStatus>>;
}>(undefined);

interface DevFriendsContextProviderProps {
  setStatus: Dispatch<SetStateAction<DevFriendsStatus>>;
}

export const DevFriendsContextProvider: React.FC<DevFriendsContextProviderProps> =
  ({ children, setStatus }) => {
    const [selectedSquads, setSelectedSquads] = useState<Squad[]>([]);

    return (
      <DevFriendsContext.Provider
        value={{ selectedSquads, setSelectedSquads, setStatus }}
      >
        {children}
      </DevFriendsContext.Provider>
    );
  };
