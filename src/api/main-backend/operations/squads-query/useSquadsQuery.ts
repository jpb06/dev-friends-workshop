import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';

import { useAxiosQuery } from '@api/wrappers/react-query/useAxiosQuery';

import type { ApiResponseDto, SquadDto } from '../../specs/api-types';

import {
  path,
  type GetAllSquadsSuccess,
  type GetAllSquadsError,
} from './../../specs/SquadsController/getAllSquads';

export const useSquadsQuery = (
  options?: Omit<
    UseQueryOptions<SquadDto[], ApiResponseDto, SquadDto[], QueryKey>,
    'queryKey'
  >,
) =>
  useAxiosQuery<GetAllSquadsSuccess, GetAllSquadsError>({
    key: ['squads'],
    url: path,
    method: 'GET',
    options,
  });
