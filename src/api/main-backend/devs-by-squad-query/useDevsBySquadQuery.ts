import { useAxiosQuery } from '@api/wrappers/react-query/useAxiosQuery';

import { SquadDto } from '../specs/api-types';
import {
  path,
  GetDevelopersBySquadsSuccess,
  GetDevelopersBySquadsError,
} from './../specs/DevsController/getDevelopersBySquads';

export const useDevsBySquadQuery = (squads?: Array<SquadDto>) =>
  useAxiosQuery<GetDevelopersBySquadsSuccess, GetDevelopersBySquadsError>({
    key: ['devs', squads],
    url: path,
    method: 'POST',
    data: squads?.map((el) => el.id),
    options: {
      enabled: squads !== undefined,
    },
  });
