import Head from 'next/head';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import {
    Card, CardContent, CardMedia, CssBaseline, Grid, ThemeProvider, Typography
} from '@material-ui/core';
import { appTheme } from '@styles/create.theme';

import { GlobalLoadingIndicator } from '../global-loading-indicator/GlobalLoadingIndicator';
import { usePageLayoutStyles } from './PageLayout.style';

interface PageLayoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const classes = usePageLayoutStyles();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Workshop my dev friends</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <Grid container direction="row" justify="center" alignItems="center">
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="/happy.jpg"
                title="Friends"
              />
              <GlobalLoadingIndicator />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  My dev friends
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  They are cool and good; but also great and cool. Together we
                  build sand castles with our minds.
                </Typography>
              </CardContent>
              {children}
            </Card>
          </Grid>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};
