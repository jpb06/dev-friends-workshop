import { squadsMockData } from '@tests/mock-data';
import { appRenderHook } from '@tests/render/appRenderHook';
import { DevFriendsContextProvider } from '@tests/render/providers/DevFriendsContextProvider';

import { useSelectedSquadsInitialization } from './useSelectedSquadsInitialization';

describe('Selected squads initialization hook', () => {
  const setSelectedSquadsMock = jest.fn();

  const renderHook = (callBack: (props: unknown) => unknown) => {
    const { wrapper } = DevFriendsContextProvider({
      status: 'loading',
      selectedSquads: [],
      setStatus: jest.fn(),
      setSelectedSquads: setSelectedSquadsMock,
    });

    return appRenderHook(callBack, {
      additionalWrappers: [wrapper],
    });
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should not update the context if there is no selected squads', () => {
    renderHook(() => useSelectedSquadsInitialization(undefined));

    expect(setSelectedSquadsMock).toHaveBeenCalledTimes(0);
  });

  it('should update the context once if passed selected squads', () => {
    renderHook(() => useSelectedSquadsInitialization(squadsMockData));

    expect(setSelectedSquadsMock).toHaveBeenCalledTimes(1);
    expect(setSelectedSquadsMock).toHaveBeenCalledWith(squadsMockData);
  });
});
