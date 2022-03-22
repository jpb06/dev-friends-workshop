import { render, screen } from '@testing-library/react';
import React from 'react';

import { BlockingError } from './BlockingError';

describe('Blocking error component', () => {
  it('should display a title', () => {
    render(<BlockingError title="Yolo!" content="Something something" />);

    screen.getByText(/yolo!/i);
  });

  it('should display a message', () => {
    render(<BlockingError title="Yolo!" content="Something something" />);

    screen.getByText(/something something/i);
  });

  it('should display an icon', () => {
    render(<BlockingError title="Yolo!" content="Something something" />);

    screen.getByRole('errorimg', {
      hidden: true,
    });
  });
});
