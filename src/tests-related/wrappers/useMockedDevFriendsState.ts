import { Dispatch, SetStateAction, useState } from "react";

import { DevFriendsStatus } from "@components/dev-friends/MyDevFriends";
import { Squad } from "@owntypes/squad.interface";

interface MockedDevFriendsState {
  selectedSquadsState: [Squad[], Dispatch<SetStateAction<Squad[]>>];
  statusState: [DevFriendsStatus, Dispatch<SetStateAction<DevFriendsStatus>>];
}

export const useMockedDevFriendsState = (
  setSelectedSquadsMock: jest.Mock<any, any> = jest.fn(),
  setStatusMock: jest.Mock<any, any> = jest.fn(),
  selectedSquads: Array<Squad> | undefined = undefined
): MockedDevFriendsState => {
  const statusState = useState<DevFriendsStatus>("loading");
  const selectedSquadsState = useState<Array<Squad>>(selectedSquads);
  selectedSquadsState[1] = setSelectedSquadsMock;
  statusState[1] = setStatusMock;

  return { selectedSquadsState, statusState };
};
