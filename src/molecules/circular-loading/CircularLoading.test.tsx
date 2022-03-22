import { render, screen } from '@testing-library/react';
import React from 'react';

import { CircularLoading } from './CircularLoading';

describe('CircularLoading component', () => {
  it('should display a loading indicator', () => {
    render(<CircularLoading />);

    screen.getByRole('progressbar', { name: 'circle-loading' });
  });
});
