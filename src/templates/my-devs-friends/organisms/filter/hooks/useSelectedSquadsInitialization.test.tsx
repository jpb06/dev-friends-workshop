import { renderHook } from '@testing-library/react-hooks';

import { squadsMockData } from '@tests/mock-data';

import { useSelectedSquadsInitialization } from './useSelectedSquadsInitialization';

const setSelectedSquadsMock = jest.fn();

describe('Selected squads initialization hook', () => {
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
