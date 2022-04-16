import { renderHook, RenderHookResult } from '@testing-library/react';

import { applyWrappers, ApplyWrappersProps } from './util/applyWrappers';

export const appRenderHook = <TResult, TProps>(
  callback: (props: TProps) => TResult,
  options?: ApplyWrappersProps
): RenderHookResult<TResult, TProps> => {
  const wrapper = applyWrappers(options);

  return renderHook(callback, {
    wrapper,
  });
};
