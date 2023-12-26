import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import {
  devsMockData,
  squadsMockData,
} from '../../../../../../tests/mock-data';

import { useDevDescription } from './useDevDescription';

describe('useDevDescription function', () => {
  const { idSquad, firstName } = devsMockData[0];

  it('should return a string describing the dev and his squad', () => {
    const { result } = renderHook(() =>
      useDevDescription(idSquad, firstName, squadsMockData),
    );

    expect(result.current.description).toBe(`${firstName} - Yolo`);
  });
});
