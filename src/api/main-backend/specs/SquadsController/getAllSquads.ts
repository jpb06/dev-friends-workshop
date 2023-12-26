/* eslint-disable */
/* tslint:disable */

/** getAllSquads
 * method: get
 * summary: Get all squads
 * description: Retrieves all the squads, but not their members
 */

import { AllSquadsResultDto, ApiResponseDto } from './../api-types';

export const path = `/squads`;

export type GetAllSquadsSuccess = AllSquadsResultDto;
export type GetAllSquadsError = ApiResponseDto;
