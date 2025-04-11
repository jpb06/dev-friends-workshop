/* eslint-disable */
/* tslint:disable */

/** getSquadsDevelopers
 * method: get
 * summary: Get the developers belonging to a squad
 * description: Retrieves the squad developers
 */

import type {
  SquadsDevelopersResultDto,
  BadRequestDto,
  ApiResponseDto,
} from './../api-types';

export const getPath = (id: number): string => `/squads/${id}/devs`;

export type GetSquadsDevelopersSuccess = SquadsDevelopersResultDto;
export type GetSquadsDevelopersError = BadRequestDto | ApiResponseDto;
