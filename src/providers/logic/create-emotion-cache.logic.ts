import createCache, { type EmotionCache } from '@emotion/cache';

export const createEmotionCache = (): EmotionCache =>
  createCache({ key: 'css' });
