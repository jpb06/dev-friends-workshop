export interface SquadDto {
  id: number;
  squad: number;
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
  firstName: string;
  squad: number;
}
export interface SquadsDevelopersResultDto {
  result: Array<DevDto>;
}
export interface BadRequestDto {
  statusCode: number;
  message: string | Array<string>;
  error: string;
}
export interface AllDevsResultDto {
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
  result: Array<DevDto>;
}
