import { SquadDto } from '@api/main-backend/specs/api-types';
import { DevFriendsStatus } from '@templates';

import { DevFriendsContext } from './../../../templates/my-devs-friends/contexts/DevFriendsContext';
import { TestWrapper } from './types/test-wrapper.type';

interface DevFriendsContextProviderProps {
  status: DevFriendsStatus;
  selectedSquads: Array<SquadDto>;
  setSelectedSquads: jest.Mock<unknown>;
  setStatus: jest.Mock<unknown>;
}

export const DevFriendsContextProvider =
  ({
    status,
    selectedSquads,
    setStatus,
    setSelectedSquads,
  }: DevFriendsContextProviderProps): TestWrapper =>
  ({ children }) =>
    (
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
