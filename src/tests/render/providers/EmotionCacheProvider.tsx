import type { PropsWithChildren } from 'react';

import { EmotionCacheProvider as EmotionCache } from '@providers';

import type { TestWrapper } from './types/test-wrapper.type';

export const EmotionCacheProvider =
  (): TestWrapper =>
  ({ children }: PropsWithChildren<unknown>) => (
    <EmotionCache>{children}</EmotionCache>
  );
