import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';

import type { DevDto } from '@api/main-backend/specs/api-types';
import {
  devsQueryHandler,
  squadsQueryHandler,
  changeDevSquadMutationHandler,
  devsBySquadQueryHandler,
} from '@msw';
import { devsMockData, squadsMockData } from '@tests/mock-data';
import { appRender } from '@tests/render/appRender';

import { ChangeSquadModal } from './ChangeSquadModal';

describe('Change squad modal component', () => {
  const dev = devsMockData[0];
  const handleClose = vi.fn();

  const render = (isOpen: boolean, dev?: DevDto) =>
    appRender(
      <ChangeSquadModal isOpen={isOpen} onClose={handleClose} dev={dev} />,
      {
        providers: ['reactQuery'],
        atoms: [],
      },
    );

  beforeEach(async () => {
    vi.clearAllMocks();
    await Promise.all([
      devsQueryHandler(devsMockData),
      squadsQueryHandler(squadsMockData),
      devsBySquadQueryHandler({ result: devsMockData }),
    ]);
  });

  it('should display nothing if there is no dev', () => {
    render(true);

    expect(
      screen.queryByRole('presentation', { name: /change-squad/i }),
    ).not.toBeInTheDocument();
  });

  it('should display nothing if the modal is not opened', () => {
    render(false, dev);

    expect(
      screen.queryByRole('presentation', { name: /change-squad/i }),
    ).not.toBeInTheDocument();
  });

  it('should display the modal', () => {
    render(true, dev);

    expect(
      screen.getByRole('presentation', { name: /change-squad/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Move Yolo man to another squad/i }),
    ).toBeInTheDocument();
  });

  it('should display a loading indicator when modal first loads', () => {
    render(true, dev);

    expect(
      screen.getByRole('progressbar', { name: /circle-loading/i }),
    ).toBeInTheDocument();
  });

  it('should display an error if data loading failed', async () => {
    await squadsQueryHandler(undefined, 500);

    render(true, dev);

    screen.getByRole('progressbar', { name: /circle-loading/i });

    await screen.findByText(/oh no!/i);
    screen.getByText(/something went wrong... Sorry!/i);
  });

  it('should display a list of squads', async () => {
    render(true, dev);

    await screen.findByRole('list', { name: /squads list/i });
    screen.getByRole('button', { name: /cool 1 members/i });
    screen.getByRole('button', { name: /bros 0 members/i });

    screen.getByText(/yolo man currently belongs to squad yolo/i);
  });

  it('should display a loading indicator when changing the dev squad', async () => {
    await changeDevSquadMutationHandler({});

    const { user } = render(true, dev);

    await screen.findByRole('list', { name: /squads list/i });

    const button = screen.getByRole('button', { name: /cool 1 members/i });
    await user.click(button);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i }),
    );

    expect(
      screen.getByRole('list', { name: /squads list/i }),
    ).toBeInTheDocument();
  });

  it('should close the modal once the mutation has completed', async () => {
    await changeDevSquadMutationHandler({});

    const { user } = render(true, dev);

    await screen.findByRole('list', { name: /squads list/i });

    const button = screen.getByRole('button', { name: /cool 1 members/i });
    await user.click(button);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i }),
    );

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should display an error message when mutation failed', async () => {
    await changeDevSquadMutationHandler({}, 500);

    const { user } = render(true, dev);

    await screen.findByRole('list', { name: /squads list/i });

    const button = screen.getByRole('button', { name: /cool 1 members/i });
    await user.click(button);

    await screen.findByText(/oh no!/i);
    screen.getByText(/something went wrong... Sorry!/i);
  });

  it('should close the modal', async () => {
    await devsBySquadQueryHandler({ result: devsMockData });

    const { user } = render(true, dev);

    const button = screen.getByRole('button', { name: /nevermind/i });
    await user.click(button);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
