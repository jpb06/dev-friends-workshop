import { act } from '@testing-library/react-hooks';
import { ChangeEvent } from 'react';

import { appRenderHook } from '@tests/render/appRenderHook';
import { DevFriendsContextProvider } from '@tests/render/providers/DevFriendsContextProvider';

import { useSquadsSelectionChange } from './useSquadsSelectionChange';

describe('Squads selection change hook', () => {
  const setStatusMock = jest.fn();
  const setSelectedSquadsMock = jest.fn();

  const renderHook = (callBack: (props: unknown) => unknown) => {
    const { wrapper } = DevFriendsContextProvider({
      selectedSquads: [],
      setStatus: setStatusMock,
      setSelectedSquads: setSelectedSquadsMock,
    });

    return appRenderHook(callBack, {
      additionalWrappers: [wrapper],
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a function and the default selected state for squads', () => {
    const { result } = renderHook(() => useSquadsSelectionChange());

    expect(result.current[0]).toStrictEqual(expect.any(Function));
    expect(result.current[1]).toStrictEqual([true, true, true, true]);
  });

  it('should modify selected squads', () => {
    const { result } = renderHook(() => useSquadsSelectionChange());

    const handleChange = result.current[0];

    act(() => {
      handleChange(
        { target: { name: '1' } } as ChangeEvent<HTMLInputElement>,
        false
      );
    });

    const values = result.current[1];

    expect(values).toStrictEqual([true, false, true, true]);
    expect(setSelectedSquadsMock).toHaveBeenCalledTimes(1);
    expect(setSelectedSquadsMock).toHaveBeenLastCalledWith([
      { id: 1, squad: 1 },
      { id: 3, squad: 3 },
      { id: 4, squad: 4 },
    ]);

    expect(setStatusMock).toHaveBeenCalledTimes(1);
    expect(setStatusMock).toHaveBeenLastCalledWith('loading');
  });

  it('should do nothing when passed an invalid target name', () => {
    const { result } = renderHook(() => useSquadsSelectionChange());

    const handleChange = result.current[0];

    act(() => {
      handleChange(
        { target: { name: '-94541' } } as ChangeEvent<HTMLInputElement>,
        false
      );
    });

    const values = result.current[1];

    expect(values).toStrictEqual([true, true, true, true]);
    expect(setSelectedSquadsMock).toHaveBeenCalledTimes(0);
    expect(setStatusMock).toHaveBeenCalledTimes(1);
    expect(setStatusMock).toHaveBeenCalledWith('loading');
  });
});