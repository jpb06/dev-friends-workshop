import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup';
import { ReactElement } from 'react';

import { applyWrappers, ApplyWrappersProps } from './util/applyWrappers';

export interface AppRenderResult extends RenderResult {
  user: UserEvent;
}

export const appRender = (
  ui: ReactElement,
  options?: ApplyWrappersProps
): AppRenderResult => {
  const wrapper = applyWrappers(options);

  const withUser = {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper,
    }),
  };

  return withUser;
};
