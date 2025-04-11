/* eslint-disable */
/* tslint:disable */

/** changeDeveloperSquad
 * method: post
 * summary: Moves the developer to another squad
 * description: Changes the squad of the developer
 */

import type {
  ChangeSquadBodyDto,
  ChangeSquadResultDto,
  BadRequestDto,
  ApiResponseDto,
} from './../api-types';

export const path = `/devs/change-squad`;

export type RequestBody = ChangeSquadBodyDto;

export type ChangeDeveloperSquadSuccess = ChangeSquadResultDto;
export type ChangeDeveloperSquadError = BadRequestDto | ApiResponseDto;
