import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { CircularLoading } from './CircularLoading';

describe('CircularLoading component', () => {
  it('should display a loading indicator', () => {
    render(<CircularLoading />);

    expect(
      screen.getByRole('progressbar', { name: 'circle-loading' }),
    ).toBeInTheDocument();
  });
});
