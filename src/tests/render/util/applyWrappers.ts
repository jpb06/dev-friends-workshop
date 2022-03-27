import { ReactQueryProvider } from './../providers/ReactQueryProvider';
import { ThemeProvider } from './../providers/ThemeProvider';
import { ReactWrapperComponent, wrappersToWrapper } from './wrappersToWrapper';

export type RenderProviders = 'reactQuery';

export interface ApplyWrappersProps {
  providers?: Array<RenderProviders>;
  additionalWrappers?: Array<ReactWrapperComponent>;
}

export const applyWrappers = (props?: ApplyWrappersProps) => {
  const providers = props?.providers || [];
  const additionalWrappers = props?.additionalWrappers || [];

  const wrappers = ['theme', ...providers].map((key) => {
    switch (key) {
      case 'theme': {
        const { wrapper: themeWrapper } = ThemeProvider();
        return themeWrapper;
      }
      case 'reactQuery': {
        const { wrapper: reactQueryWrapper } = ReactQueryProvider();
        return reactQueryWrapper;
      }
      default:
        throw new Error(`${key} no handled in applyWrappers`);
    }
  });

  return wrappersToWrapper([...wrappers, ...additionalWrappers]);
};
