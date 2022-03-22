import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { useIsFetching } from 'react-query';

import { GlobalLoadingIndicator } from './GlobalLoadingIndicator';

jest.mock('react-query');

describe('Global loading indicator component', () => {
  it('should not display a loading indicator when there is no XHR calls', () => {
    mocked(useIsFetching).mockReturnValueOnce(0);

    render(<GlobalLoadingIndicator />);

    expect(
      screen.queryByRole('progressbar', { name: /app-is-loading/i })
    ).not.toBeInTheDocument();
  });

  it('should display the loading indicator when there is pending XHR calls', () => {
    mocked(useIsFetching).mockReturnValueOnce(1);

    render(<GlobalLoadingIndicator />);

    screen.getByRole('progressbar', { name: /app-is-loading/i });
  });
});
