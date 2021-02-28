import { DevFriendsContext } from "@components/dev-friends/contexts/DevFriendsContext.context";

import { useMockedDevFriendsState } from "./useMockedDevFriendsState";

export const DevFriendsContextWrapper = (
  setSelectedSquadsMock: jest.Mock<any, any> = jest.fn(),
  setStatusMock: jest.Mock<any, any> = jest.fn()
): (({ children }) => JSX.Element) => {
  const wrapper = ({ children }) => {
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
