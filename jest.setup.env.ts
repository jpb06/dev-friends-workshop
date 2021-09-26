import { loadEnvConfig } from '@next/env';

export default async (): Promise<void> => {
  loadEnvConfig('.');
};
