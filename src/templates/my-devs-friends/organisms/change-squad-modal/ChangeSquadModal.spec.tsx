import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {
  devsQueryHandler,
  squadsQueryHandler,
  changeDevSquadMutationHandler,
} from '@msw';
import { devsMockData, squadsMockData } from '@tests/mock-data';

import { ChangeSquadModal } from './ChangeSquadModal';

describe('Change squad modal component', () => {
  const dev = devsMockData[0];
  const handleClose = jest.fn();

  beforeAll(() => {
    devsQueryHandler(devsMockData, 200, true);
    squadsQueryHandler(squadsMockData, 200, true);
    changeDevSquadMutationHandler();
  });

  it('should display nothing if there is no dev', () => {
    render(<ChangeSquadModal isOpen onClose={handleClose} dev={null} />);

    expect(
      screen.queryByRole('presentation', { name: /change-squad/i })
    ).not.toBeInTheDocument();
  });

  it('should display nothing if the modal is not opened', () => {
    render(<ChangeSquadModal isOpen={false} onClose={handleClose} dev={dev} />);

    expect(
      screen.queryByRole('presentation', { name: /change-squad/i })
    ).not.toBeInTheDocument();
  });

  it('should display the modal', () => {
    render(<ChangeSquadModal isOpen onClose={handleClose} dev={dev} />);

    screen.getByRole('presentation', { name: /change-squad/i });
    screen.getByRole('heading', { name: /Move Yolo man to another squad/i });
  });

  it('should display a loading indicator when modal first loads', () => {
    render(<ChangeSquadModal isOpen onClose={handleClose} dev={dev} />);

    screen.getByRole('progressbar', { name: /circle-loading/i });
  });

  it('should display a list of squads', async () => {
    render(<ChangeSquadModal isOpen onClose={handleClose} dev={dev} />);

    await screen.findByRole('list', { name: /squads list/i });
    screen.getByRole('button', { name: /squad 2 1 members/i });
    screen.getByRole('button', { name: /squad 5 0 members/i });

    screen.getByText(/yolo man currently belongs to squad 1/i);
  });

  it('should display a loading indicator when changing the dev squad', async () => {
    render(<ChangeSquadModal isOpen onClose={handleClose} dev={dev} />);

    await screen.findByRole('list', { name: /squads list/i });

    const button = screen.getByRole('button', { name: /squad 2 1 members/i });
    userEvent.click(button);

    await screen.findByRole('progressbar', { name: /circle-loading/i });
  });

  it('should close the modal once the mutation has completed', async () => {
    render(<ChangeSquadModal isOpen onClose={handleClose} dev={dev} />);

    await screen.findByRole('list', { name: /squads list/i });

    const button = screen.getByRole('button', { name: /squad 2 1 members/i });
    userEvent.click(button);

    await screen.findByRole('progressbar', { name: /circle-loading/i });

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i })
    );

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should close the modal', () => {
    render(<ChangeSquadModal isOpen onClose={handleClose} dev={dev} />);

    const button = screen.getByRole('button', { name: /nevermind/i });
    userEvent.click(button);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
