import { Build } from '@mui/icons-material';
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { appRender } from '@tests/render/appRender';

import { GlobalIndicator } from './GlobalIndicator';

describe('GlobalIndicator component', () => {
  it('should display a title and its children', () => {
    const title = 'Loading stuff';
    const children = 'children';

    appRender(
      <GlobalIndicator title={title} Icon={Build}>
        {children}
      </GlobalIndicator>,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
