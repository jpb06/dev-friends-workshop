/** getAllDevelopers
 * verb: get
 * summary: Get all developers
 * description: Retrieves all developers, but not their squad
 */

import { AllDevsResultDto, ApiResponseDto } from './../api-types';

export const path = `${process.env.NEXT_PUBLIC_API_URL}/devs`;

export type GetAllDevelopersSuccess = AllDevsResultDto;
export type GetAllDevelopersError = ApiResponseDto;
