import { useAxiosQuery } from '@api/wrappers/react-query/useAxiosQuery';

import {
  path,
  GetAllSquadsSuccess,
  GetAllSquadsError,
} from './../specs/SquadsController/getAllSquads';

export const useSquadsQuery = () =>
  useAxiosQuery<GetAllSquadsSuccess, GetAllSquadsError>({
    key: 'squads',
    url: path,
    method: 'GET',
  });
