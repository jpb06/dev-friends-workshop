import { useAxiosQuery } from '@api/wrappers/react-query/useAxiosQuery';

import {
  path,
  GetAllDevelopersSuccess,
  GetAllDevelopersError,
} from './../specs/DevsController/getAllDevelopers';

export const useDevsQuery = () =>
  useAxiosQuery<GetAllDevelopersSuccess, GetAllDevelopersError>({
    key: 'devs',
    url: path,
    method: 'GET',
  });
