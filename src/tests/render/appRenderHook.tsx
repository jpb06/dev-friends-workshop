import type { RenderHookResult } from '@testing-library/react';
import { renderHook } from '@testing-library/react';

import type { ApplyWrappersProps } from './util/applyWrappers';
import { applyWrappers } from './util/applyWrappers';

export const appRenderHook = <TResult, TProps>(
  callback: (props: TProps) => TResult,
  options?: ApplyWrappersProps,
): RenderHookResult<TResult, TProps> => {
  const wrapper = applyWrappers(options);

  return renderHook(callback, {
    wrapper,
  });
};
