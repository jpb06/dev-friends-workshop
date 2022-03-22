/** getAllSquads
 * verb: get
 * summary: Get all squads
 * description: Retrieves all the squads, but not their members
 */

import { AllSquadsResultDto, ApiResponseDto } from './../api-types';

export const path = `${process.env.NEXT_PUBLIC_API_URL}/squads`;

export type GetAllSquadsSuccess = AllSquadsResultDto;
export type GetAllSquadsError = ApiResponseDto;
