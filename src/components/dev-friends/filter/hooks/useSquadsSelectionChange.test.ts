import { act, renderHook } from '@testing-library/react-hooks';
import { ChangeEvent } from 'react';

import { DevFriendsContextWrapper } from '@tests/wrappers';

import { useSquadsSelectionChange } from './useSquadsSelectionChange';

describe('Squads selection change hook', () => {
  const setSelectedSquadsMock = jest.fn();
  const setStatusMock = jest.fn();
  const wrapper = DevFriendsContextWrapper(
    setSelectedSquadsMock,
    setStatusMock
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a function and the default selected state for squads', () => {
    const { result } = renderHook(() => useSquadsSelectionChange(), {
      wrapper,
    });

    expect(result.current[0]).toStrictEqual(expect.any(Function));
    expect(result.current[1]).toStrictEqual([true, true, true, true]);
  });

  it('should modify selected squads', () => {
    const { result } = renderHook(() => useSquadsSelectionChange(), {
      wrapper,
    });

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
    const { result } = renderHook(() => useSquadsSelectionChange(), {
      wrapper,
    });

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
