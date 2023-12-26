/* eslint-disable */
/* tslint:disable */

/** getDevelopersBySquads
 * method: post
 * summary: Get developers belonging to one or several squads
 * description: Retrieves the developers belonging to a set of squads
 */

import { DevelopersBySquadsBodyDto, DevelopersBySquadsResultDto, BadRequestDto, ApiResponseDto } from './../api-types';

export const path = `/devs/by-squads`;

export type RequestBody = DevelopersBySquadsBodyDto;

export type GetDevelopersBySquadsSuccess = DevelopersBySquadsResultDto;
export type GetDevelopersBySquadsError = BadRequestDto | ApiResponseDto;
