import { QueryObserverResult, useQuery } from 'react-query';

import { axiosGet } from '@logic/axios/axios.get.wrapper';
import { Dev } from '@type/dev.interface';

import { devsUrl } from './config';

export const useDevsQuery = (): QueryObserverResult<Array<Dev>> =>
  useQuery('devs', () => axiosGet(devsUrl));
