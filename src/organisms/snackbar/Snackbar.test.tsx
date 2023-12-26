import type { AlertColor } from '@mui/material';
import { Button } from '@mui/material';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { useContext } from 'react';
import { describe, it, expect } from 'vitest';

import { appRender } from '@tests/render';

import { SnackbarContext, WithSnackbar } from './Snackbar.context';

const SnackbarWrapper = () => (
  <WithSnackbar>
    <>
      <Clicker severity="error" />
      <Clicker severity="info" />
      <Clicker severity="success" />
      <Clicker severity="warning" />
    </>
  </WithSnackbar>
);

type ClickerProps = { severity: AlertColor };

const Clicker = ({ severity }: ClickerProps) => {
  const showSnackbar = useContext(SnackbarContext);

  const handleClick = () => {
    showSnackbar(`${severity} message`, severity);
  };

  return <Button onClick={handleClick}>{severity}</Button>;
};

describe('Snackbar component', () => {
  it.each([
    ['error', 'ErrorOutlineIcon'],
    ['info', 'InfoOutlinedIcon'],
    ['success', 'SuccessOutlinedIcon'],
    ['warning', 'ReportProblemOutlinedIcon'],
  ])('%s', async (severity, iconId) => {
    const { user } = appRender(<SnackbarWrapper />);

    const button = screen.getByRole('button', { name: severity });
    await user.click(button);

    await screen.findByText(`${severity} message`);
    expect(screen.getByTestId(iconId)).toBeInTheDocument();
  });

  it('should display a warning and then an error', async () => {
    const { user } = appRender(<SnackbarWrapper />);

    await user.click(screen.getByRole('button', { name: 'warning' }));

    await screen.findByText('warning message');
    expect(screen.getByTestId('ReportProblemOutlinedIcon')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'error' }));

    await screen.findByText('error message');
    expect(screen.getByTestId('ErrorOutlineIcon')).toBeInTheDocument();
  });

  it('should close a displayed snackbar', async () => {
    const { user } = appRender(<SnackbarWrapper />);

    await user.click(screen.getByRole('button', { name: 'warning' }));

    await screen.findByText('warning message');
    await screen.findByTestId('ReportProblemOutlinedIcon');

    await user.click(screen.getByRole('button', { name: 'Close' }));

    await waitForElementToBeRemoved(() =>
      screen.queryByText('warning message'),
    );
  });
});
