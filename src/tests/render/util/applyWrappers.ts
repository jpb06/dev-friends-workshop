import {
  EmotionCacheProvider,
  ReactQueryProvider,
  SnackbarProvider,
  ThemeProvider,
} from './../providers';
import { Wrapper, wrappersToWrapper } from './wrappersToWrapper';

export type RenderProviders = 'reactQuery' | 'snackbar';

export interface ApplyWrappersProps {
  providers?: Array<RenderProviders>;
  additionalWrappers?: Array<Wrapper>;
}

export const applyWrappers = (props?: ApplyWrappersProps) => {
  const defaultProviders = ['emotionCache', 'theme'];

  const providers = props?.providers || [];
  const additionalWrappers = props?.additionalWrappers || [];

  const wrappers: Array<Wrapper> = [...defaultProviders, ...providers].map(
    (key) => {
      switch (key) {
        case 'theme': {
          const { wrapper: themeWrapper } = ThemeProvider();
          return themeWrapper;
        }
        case 'reactQuery': {
          const { wrapper: reactQueryWrapper } = ReactQueryProvider();
          return reactQueryWrapper;
        }
        case 'snackbar': {
          const { wrapper: snackbarWrapper } = SnackbarProvider();
          return snackbarWrapper;
        }
        case 'emotionCache': {
          const { wrapper: EmotionCacheWrapper } = EmotionCacheProvider();

          return EmotionCacheWrapper;
        }
        default:
          throw new Error(`${key} no handled in applyWrappers`);
      }
    }
  );

  return wrappersToWrapper([...wrappers, ...additionalWrappers]);
};
