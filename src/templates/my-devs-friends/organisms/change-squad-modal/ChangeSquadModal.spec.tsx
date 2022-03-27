import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { DevDto } from '@api/main-backend/specs/api-types';
import {
  devsQueryHandler,
  squadsQueryHandler,
  changeDevSquadMutationHandler,
  devsBySquadQueryHandler,
} from '@msw';
import { devsMockData, squadsMockData } from '@tests/mock-data';
import { appRender } from '@tests/render/appRender';

import { DevFriendsContextProvider } from '../../contexts/DevFriendsContext';
import { ChangeSquadModal } from './ChangeSquadModal';

describe('Change squad modal component', () => {
  const dev = devsMockData[0];
  const handleClose = jest.fn();

  const render = (isOpen: boolean, dev: DevDto | null) => {
    return appRender(
      <DevFriendsContextProvider setStatus={jest.fn()}>
        <ChangeSquadModal isOpen={isOpen} onClose={handleClose} dev={dev} />
      </DevFriendsContextProvider>,
      {
        providers: ['reactQuery'],
      }
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    devsQueryHandler(devsMockData);
    squadsQueryHandler(squadsMockData);
    changeDevSquadMutationHandler({});
  });

  it('should display nothing if there is no dev', () => {
    render(true, null);

    expect(
      screen.queryByRole('presentation', { name: /change-squad/i })
    ).not.toBeInTheDocument();
  });

  it('should display nothing if the modal is not opened', () => {
    render(false, dev);

    expect(
      screen.queryByRole('presentation', { name: /change-squad/i })
    ).not.toBeInTheDocument();
  });

  it('should display the modal', () => {
    render(true, dev);

    expect(
      screen.getByRole('presentation', { name: /change-squad/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Move Yolo man to another squad/i })
    ).toBeInTheDocument();
  });

  it('should display a loading indicator when modal first loads', () => {
    render(true, dev);

    expect(
      screen.getByRole('progressbar', { name: /circle-loading/i })
    ).toBeInTheDocument();
  });

  it('should display an error if data loading failed', async () => {
    squadsQueryHandler(undefined, 500);

    render(true, dev);

    screen.getByRole('progressbar', { name: /circle-loading/i });

    await screen.findByText(/oh no!/i);
    screen.getByText(/something went wrong... Sorry!/i);
  });

  it('should display a list of squads', async () => {
    render(true, dev);

    await screen.findByRole('list', { name: /squads list/i });
    screen.getByRole('button', { name: /squad 2 1 members/i });
    screen.getByRole('button', { name: /squad 5 0 members/i });

    screen.getByText(/yolo man currently belongs to squad 1/i);
  });

  it('should display a loading indicator when changing the dev squad', async () => {
    devsBySquadQueryHandler({ result: devsMockData });

    render(true, dev);

    await screen.findByRole('list', { name: /squads list/i });

    const button = screen.getByRole('button', { name: /squad 2 1 members/i });
    userEvent.click(button);

    await waitForElementToBeRemoved(
      screen.getByRole('progressbar', { name: /circle-loading/i })
    );

    screen.getByRole('list', { name: /squads list/i });
  });

  it('should close the modal once the mutation has completed', async () => {
    devsBySquadQueryHandler({ result: devsMockData });

    render(true, dev);

    await screen.findByRole('list', { name: /squads list/i });

    const button = screen.getByRole('button', { name: /squad 2 1 members/i });
    userEvent.click(button);

    await screen.findByRole('progressbar', { name: /circle-loading/i });

    await waitForElementToBeRemoved(
      screen.getByRole('progressbar', { name: /circle-loading/i })
    );

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should display an error message when mutation failed', async () => {
    changeDevSquadMutationHandler({}, 500);

    render(true, dev);

    await screen.findByRole('list', { name: /squads list/i });

    const button = screen.getByRole('button', { name: /squad 2 1 members/i });
    userEvent.click(button);

    await screen.findByRole('progressbar', { name: /circle-loading/i });

    await waitForElementToBeRemoved(
      screen.getByRole('progressbar', { name: /circle-loading/i })
    );

    await screen.findByText(/oh no!/i);
    screen.getByText(/something went wrong... Sorry!/i);
  });

  it('should close the modal', async () => {
    devsBySquadQueryHandler({ result: devsMockData });

    render(true, dev);

    const button = screen.getByRole('button', { name: /nevermind/i });
    userEvent.click(button);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
