import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import type { PropsWithChildren } from 'react';

import { createEmotionCache } from './logic/create-emotion-cache.logic';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface Props {
  emotionCache?: EmotionCache;
}

export const EmotionCacheProvider = ({
  children,
  emotionCache = clientSideEmotionCache,
}: PropsWithChildren<Props>) => (
  <CacheProvider value={emotionCache}>{children}</CacheProvider>
);
