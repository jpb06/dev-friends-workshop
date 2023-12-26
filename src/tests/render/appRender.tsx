import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import type { ReactElement } from 'react';

import type { ApplyWrappersProps } from './util/applyWrappers';
import { applyWrappers } from './util/applyWrappers';

export interface AppRenderResult extends RenderResult {
  user: UserEvent;
}

export const appRender = (
  ui: ReactElement,
  options: ApplyWrappersProps = {
    providers: [],
    atoms: [],
  },
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
