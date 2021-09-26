import { QueryObserverResult, useQuery } from 'react-query';

import { axiosPost } from '@logic/axios/axios.post.wrapper';
import { Dev } from '@type/dev.interface';
import { Squad } from '@type/squad.interface';

import { devsByUrl } from './config';

export const useDevsBySquadQuery = (
  squads?: Array<Squad>
): QueryObserverResult<Array<Dev>> =>
  useQuery(
    ['devs', squads],
    () =>
      axiosPost<Array<Dev>>(devsByUrl, {
        idSquads: squads.map((el) => el.id),
      }),
    {
      enabled: squads !== undefined,
    }
  );
