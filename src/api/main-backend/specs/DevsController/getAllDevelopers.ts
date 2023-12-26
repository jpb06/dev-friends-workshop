/* eslint-disable */
/* tslint:disable */

/** getAllDevelopers
 * method: get
 * summary: Get all developers
 * description: Retrieves all developers, but not their squad
 */

import { AllDevsResultDto, ApiResponseDto } from './../api-types';

export const path = `/devs`;

export type GetAllDevelopersSuccess = AllDevsResultDto;
export type GetAllDevelopersError = ApiResponseDto;
