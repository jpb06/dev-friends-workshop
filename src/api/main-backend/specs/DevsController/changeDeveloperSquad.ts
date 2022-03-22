/** changeDeveloperSquad
 * verb: post
 * summary: Moves the developer to another squad
 * description: Changes the squad of the developer
 */

import {
  ChangeSquadBodyDto,
  ChangeSquadResultDto,
  BadRequestDto,
  ApiResponseDto,
} from './../api-types';

export const path = `${process.env.NEXT_PUBLIC_API_URL}/devs/change-squad`;

export type RequestBody = ChangeSquadBodyDto;

export type ChangeDeveloperSquadSuccess = ChangeSquadResultDto;
export type ChangeDeveloperSquadError = BadRequestDto | ApiResponseDto;
