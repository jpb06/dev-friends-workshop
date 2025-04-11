import type { EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { FunctionComponent } from 'react';

import { FullpageBox, WithSnackbar } from '@organisms';
import {
  AppThemeProvider,
  EmotionCacheProvider,
  ReactQueryProvider,
} from '@providers';

export interface EmotionAppProps extends AppProps {
  emotionCache: EmotionCache;
}

const MyApp: FunctionComponent<EmotionAppProps> = ({
  Component,
  emotionCache,
  pageProps,
}) => (
  <EmotionCacheProvider emotionCache={emotionCache}>
    <Head>
      <title>My dev friends</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <AppThemeProvider>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <WithSnackbar>
        <ReactQueryProvider>
          <FullpageBox>
            <Component {...pageProps} />
          </FullpageBox>
        </ReactQueryProvider>
      </WithSnackbar>
    </AppThemeProvider>
  </EmotionCacheProvider>
);

// biome-ignore lint/style/noDefaultExport: next
export default MyApp;
