import { SquadDto } from '@api/main-backend/specs/api-types';

import { DevFriendsContext } from './../../../templates/my-devs-friends/contexts/DevFriendsContext';
import { WrapperResult } from './types/wrapper-result.type';

interface DevFriendsContextProviderProps {
  selectedSquads: Array<SquadDto>;
  setSelectedSquads: jest.Mock<unknown>;
  setStatus: jest.Mock<unknown>;
}

export const DevFriendsContextProvider = ({
  selectedSquads,
  setStatus,
  setSelectedSquads,
}: DevFriendsContextProviderProps): WrapperResult => {
  const Wrapper = ({ children }) => {
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

  return { wrapper: Wrapper };
};
