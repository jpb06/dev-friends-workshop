import { Dev } from '@owntypes/dev.interface';

export const getDevDescription = (dev: Omit<Dev, 'id'>): string =>
  `${dev.firstName} - Squad ${dev.squad}`;
