import { QueryObserverResult } from 'react-query';
import { MockedFunction } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';

import { useSquadsQuery } from '@api/main-backend/useSquadsQuery';
import { Squad } from '@type/squad.interface';

export const setUseSquadsReturnValue = (
  data?: Array<Squad>
): MockedFunction<() => QueryObserverResult<Squad[]>> =>
  mocked(useSquadsQuery).mockReturnValue({ data } as any);
