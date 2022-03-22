import { render, screen } from '@testing-library/react';
import React from 'react';

import { LinearLoading } from './LinearLoading';

describe('LinearLoading component', () => {
  it('should display a loading indicator', () => {
    render(<LinearLoading />);

    screen.getByRole('progressbar', { name: 'linear-loading' });
  });
});
