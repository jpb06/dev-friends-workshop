import {
  renderHook,
  RenderHookResult,
  WrapperComponent,
} from '@testing-library/react-hooks';

import { applyWrappers, ApplyWrappersProps } from './util/applyWrappers';

export const appRenderHook = <TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: ApplyWrappersProps
): RenderHookResult<TProps, TResult> => {
  const wrapper = applyWrappers(options);

  return renderHook(callback, {
    wrapper: wrapper as WrapperComponent<TProps>,
  });
};
