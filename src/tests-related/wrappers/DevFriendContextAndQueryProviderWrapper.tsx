import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { DevFriendsContext } from "@components/dev-friends/contexts/DevFriendsContext";
import { Squad } from "@owntypes/squad.interface";

import { getQueryClient } from "./queryClient";
import { useMockedDevFriendsState } from "./useMockedDevFriendsState";

const queryClient = getQueryClient();

interface DevFriendContextAndQueryProviderWrapperResult {
  wrapper: ({ children }) => JSX.Element;
  queryClient: QueryClient;
}

export const DevFriendContextAndQueryProviderWrapper = (
  setSelectedSquadsMock: jest.Mock<any, any> = jest.fn(),
  setStatusMock: jest.Mock<any, any> = jest.fn(),
  selectedSquad: Array<Squad> | undefined = undefined
): DevFriendContextAndQueryProviderWrapperResult => {
  const wrapper = ({ children }) => {
    const { selectedSquadsState, statusState } = useMockedDevFriendsState(
      setSelectedSquadsMock,
      setStatusMock,
      selectedSquad
    );

    return (
      <QueryClientProvider client={queryClient}>
        <DevFriendsContext.Provider
          value={{
            selectedSquads: selectedSquadsState[0],
            setSelectedSquads: selectedSquadsState[1],
            setStatus: statusState[1],
          }}
        >
          {children}
        </DevFriendsContext.Provider>
      </QueryClientProvider>
    );
  };

  return { wrapper, queryClient };
};
