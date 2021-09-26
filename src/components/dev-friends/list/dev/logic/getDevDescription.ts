import { Dev } from '@type/dev.interface';

export const getDevDescription = (dev: Omit<Dev, 'id'>): string =>
  `${dev.firstName} - Squad ${dev.squad}`;
