import { render as rtlRender, RenderResult } from '@testing-library/react';
import React from 'react';

import { WithSnackbar } from '@organisms';
import { AppThemeProvider, EmotionCacheProvider } from '@providers';

import { ReactQueryWrapper } from '../wrappers/react-query';

export const render = (component: JSX.Element): RenderResult => {
  const wrapper: React.FC = ({ children }) => {
    return (
      <EmotionCacheProvider>
        <AppThemeProvider>
          <WithSnackbar>
            <ReactQueryWrapper>{children}</ReactQueryWrapper>
          </WithSnackbar>
        </AppThemeProvider>
      </EmotionCacheProvider>
    );
  };

  return rtlRender(component, { wrapper });
};
