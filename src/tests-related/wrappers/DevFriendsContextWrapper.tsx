import { DevFriendsContext } from '@components/dev-friends/contexts/DevFriendsContext';

import { useMockedDevFriendsState } from './useMockedDevFriendsState';

export const DevFriendsContextWrapper = (
  setSelectedSquadsMock: jest.Mock<any, any> = jest.fn(),
  setStatusMock: jest.Mock<any, any> = jest.fn()
): (({ children }) => JSX.Element) => {
  const wrapper = ({ children }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { selectedSquadsState, statusState } = useMockedDevFriendsState(
      setSelectedSquadsMock,
      setStatusMock
    );

    return (
      <DevFriendsContext.Provider
        value={{
          selectedSquads: selectedSquadsState[0],
          setSelectedSquads: selectedSquadsState[1],
          setStatus: statusState[1],
        }}
      >
        {children}
      </DevFriendsContext.Provider>
    );
  };

  return wrapper;
};
