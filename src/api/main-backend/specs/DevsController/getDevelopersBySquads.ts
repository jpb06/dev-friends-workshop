/** getDevelopersBySquads
 * verb: post
 * summary: Get developers belonging to one or several squads
 * description: Retrieves the developers belonging to a set of squads
 */

import {
  DevelopersBySquadsBodyDto,
  DevelopersBySquadsResultDto,
  BadRequestDto,
  ApiResponseDto,
} from './../api-types';

export const path = `${process.env.NEXT_PUBLIC_API_URL}/devs/by-squads`;

export type RequestBody = DevelopersBySquadsBodyDto;

export type GetDevelopersBySquadsSuccess = DevelopersBySquadsResultDto;
export type GetDevelopersBySquadsError = BadRequestDto | ApiResponseDto;
