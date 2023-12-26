import type { PropsWithChildren } from 'react';

import { EmotionCacheProvider as EmotionCache } from '@providers';

import type { TestWrapper } from './types/test-wrapper.type';

export const EmotionCacheProvider =
  (): TestWrapper =>
  // eslint-disable-next-line react/display-name
  ({ children }: PropsWithChildren<unknown>) => (
    <EmotionCache>{children}</EmotionCache>
  );
