import { DevDto } from '@api/main-backend/specs/api-types';

export const getDevDescription = (dev: Omit<DevDto, 'id'>): string =>
  `${dev.firstName} - Squad ${dev.squad}`;
