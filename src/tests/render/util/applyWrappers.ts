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
          return ThemeProvider();
        }
        case 'reactQuery': {
          return ReactQueryProvider();
        }
        case 'snackbar': {
          return SnackbarProvider();
        }
        case 'emotionCache': {
          return EmotionCacheProvider();
        }
        default:
          throw new Error(`${key} no handled in applyWrappers`);
      }
    }
  );

  return wrappersToWrapper([...wrappers, ...additionalWrappers]);
};
