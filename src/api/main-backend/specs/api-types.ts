/* eslint-disable */
/* tslint:disable */

export interface SquadDto {
  id: number;
  name: string;
  devsCount: number;
}
export interface AllSquadsResultDto {
  result: Array<SquadDto>;
}
export interface ApiResponseDto {
  statusCode: number;
  message: string;
}
export interface DevDto {
  id: number;
  idSquad: number;
  firstName: string;
  avatar: string;
}
export interface SquadsDevelopersResultDto {
  PreviousPage?: number;
  currentPage: number;
  nextPage?: number;
  lastPage: number;
  total: number;
  result: Array<DevDto>;
}
export interface BadRequestDto {
  statusCode: number;
  message: string | Array<string>;
  error: string;
}
export interface AllDevsResultDto {
  PreviousPage?: number;
  currentPage: number;
  nextPage?: number;
  lastPage: number;
  total: number;
  result: Array<DevDto>;
}
export interface ChangeSquadBodyDto {
  idDev: number;
  idSquad: number;
}
export interface ChangeSquadResultDto {
  result: string;
}
export interface DevelopersBySquadsBodyDto {
  idSquads: Array<number>;
}
export interface DevelopersBySquadsResultDto {
  PreviousPage?: number;
  currentPage: number;
  nextPage?: number;
  lastPage: number;
  total: number;
  result: Array<DevDto>;
}
