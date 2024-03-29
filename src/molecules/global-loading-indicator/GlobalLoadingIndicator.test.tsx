import { useIsFetching } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';

import { GlobalLoadingIndicator } from './GlobalLoadingIndicator';

vi.mock('@tanstack/react-query');

describe('Global loading indicator component', () => {
  it('should not display a loading indicator when there is no XHR calls', () => {
    vi.mocked(useIsFetching).mockReturnValueOnce(0);

    render(<GlobalLoadingIndicator />);

    expect(
      screen.queryByRole('progressbar', { name: /app-is-loading/i }),
    ).not.toBeInTheDocument();
  });

  it('should display the loading indicator when there is pending XHR calls', () => {
    vi.mocked(useIsFetching).mockReturnValueOnce(1);

    render(<GlobalLoadingIndicator />);

    expect(
      screen.getByRole('progressbar', { name: /app-is-loading/i }),
    ).toBeInTheDocument();
  });
});
