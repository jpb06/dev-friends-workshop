import { render, screen } from '@testing-library/react';
import React from 'react';

import { StatusReport } from './StatusReport';

describe('Status report component', () => {
  it('should display an error', () => {
    render(<StatusReport status="errored" />);

    expect(screen.getByText(/oh no!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/something went wrong... sorry!/i)
    ).toBeInTheDocument();
  });

  it('should display a loading indicator', () => {
    render(<StatusReport status="loading" />);

    expect(
      screen.getByRole('progressbar', { name: 'circle-loading' })
    ).toBeInTheDocument();
  });

  it('should display nothing', () => {
    render(<StatusReport status="ready" />);

    expect(screen.queryByText(/oh no!/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/something went wrong... sorry!/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('progressbar', { name: 'circle-loading' })
    ).not.toBeInTheDocument();
  });
});
