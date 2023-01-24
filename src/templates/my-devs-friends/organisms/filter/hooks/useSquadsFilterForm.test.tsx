import { act, waitFor } from '@testing-library/react';
import { Atom } from 'jotai';
import { ChangeEvent } from 'react';

import { appRenderHook } from '@tests/render/appRenderHook';

import { useSquadsFilterForm } from './useSquadsFilterForm';
import { squadsQueryHandler } from '../../../../../api/main-backend/msw-handlers';
import { selectedSquadsAtom } from '../../../../../state/selected-squads.atom';
import { uiStatusAtom } from '../../../../../state/ui-status.atom';
import { useCheckJotaiState } from '../../../../../tests/hooks/useCheckJotaiState';
import { squadsMockData } from '../../../../../tests/mock-data';

const useTest = () => {
  const { selectedSquads, uiStatus } = useCheckJotaiState();
  const { handleChange, formValues } = useSquadsFilterForm();

  return { selectedSquads, uiStatus, handleChange, formValues };
};

describe('useSquadsFilterForm hook', () => {
  function renderHook<T>(callBack: (props: unknown) => T) {
    return appRenderHook(callBack, {
      providers: ['reactQuery', 'jotai'],
      atoms: [
        [selectedSquadsAtom, []],
        [uiStatusAtom, 'loading'],
      ] as Array<[Atom<unknown>, unknown]>,
    });
  }

  beforeEach(() => {
    squadsQueryHandler(squadsMockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a function and the default selected state for squads', () => {
    const { result } = renderHook(() => useSquadsFilterForm());

    expect(result.current.handleChange).toStrictEqual(expect.any(Function));
    expect(result.current.formValues).toStrictEqual([true, true, true, true]);
  });

  it('should modify selected squads', async () => {
    const { result } = renderHook(() => useTest());

    const handleChange = result.current.handleChange;

    act(() => {
      handleChange(
        { target: { name: '1' } } as ChangeEvent<HTMLInputElement>,
        false
      );
    });

    const values = result.current.formValues;
    expect(values).toStrictEqual([true, false, true, true]);

    await waitFor(() =>
      expect(result.current.selectedSquads).toStrictEqual([1, 3, 4])
    );

    expect(result.current.uiStatus).toBe('loading');
  });

  it('should do nothing when passed an invalid target name', () => {
    const { result } = renderHook(() => useTest());

    const handleChange = result.current.handleChange;

    act(() => {
      handleChange(
        { target: { name: '-94541' } } as ChangeEvent<HTMLInputElement>,
        false
      );
    });

    const values = result.current.formValues;

    expect(values).toStrictEqual([true, true, true, true]);
    expect(result.current.selectedSquads).toStrictEqual([]);
    expect(result.current.uiStatus).toBe('loading');
  });
});
