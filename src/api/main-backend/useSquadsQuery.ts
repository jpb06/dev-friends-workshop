import { QueryObserverResult, useQuery } from 'react-query';

import { axiosGet } from '@logic/axios/axios.get.wrapper';
import { Squad } from '@type/squad.interface';

import { squadsUrl } from './config';

export const useSquadsQuery = (): QueryObserverResult<Array<Squad>> =>
  useQuery('squads', () => axiosGet(squadsUrl));
