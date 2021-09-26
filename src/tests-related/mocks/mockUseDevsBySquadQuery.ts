import { QueryObserverResult } from 'react-query';
import { MockedFunction } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';

import { useDevsBySquadQuery } from '@api/main-backend/useDevsBySquadQuery';
import { Dev } from '@type/dev.interface';
import { Squad } from '@type/squad.interface';

export const setUseDevsBySquadReturnValue = (
  data: Array<Squad>
): MockedFunction<(squads?: Squad[]) => QueryObserverResult<Dev[]>> =>
  mocked(useDevsBySquadQuery).mockReturnValueOnce({ data } as any);
