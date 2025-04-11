import { useAxiosQuery } from '@api/wrappers/react-query/useAxiosQuery';

import {
  path,
  type GetAllDevelopersSuccess,
  type GetAllDevelopersError,
} from './../../specs/DevsController/getAllDevelopers';

export const useDevsQuery = () =>
  useAxiosQuery<GetAllDevelopersSuccess, GetAllDevelopersError>({
    key: ['devs'],
    url: path,
    method: 'GET',
  });
