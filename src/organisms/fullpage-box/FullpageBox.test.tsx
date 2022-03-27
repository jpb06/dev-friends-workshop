import { screen } from '@testing-library/react';

import { appRender } from '@tests/render/appRender';

import { FullpageBox } from './FullpageBox';

describe('FullpageBox component', () => {
  const children = 'children';

  it('should display a banner and a brand', () => {
    appRender(<FullpageBox>{children}</FullpageBox>, {
      providers: ['reactQuery'],
    });

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByTestId('EmojiPeopleIcon')).toBeInTheDocument();
    expect(screen.getByText(/my dev friends/i)).toBeInTheDocument();
  });

  it('should display its children', () => {
    appRender(<FullpageBox>{children}</FullpageBox>, {
      providers: ['reactQuery'],
    });

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
