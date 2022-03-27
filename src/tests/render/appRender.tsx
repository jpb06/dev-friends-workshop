import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';

import { applyWrappers, ApplyWrappersProps } from './util/applyWrappers';

export const appRender = (
  ui: ReactElement,
  options?: ApplyWrappersProps
): RenderResult => {
  const wrapper = applyWrappers(options);

  return render(ui, {
    wrapper,
  });
};
