import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';

import {
  devsQueryHandler,
  squadsQueryHandler,
  changeDevSquadMutationHandler,
  devsBySquadQueryHandler,
} from '@msw';

import { DevDto } from '@api/main-backend/specs/api-types';
import { devsMockData, squadsMockData } from '@tests/mock-data';
import { appRender } from '@tests/render/appRender';

import { DevFriendsContextProvider } from '../../contexts/DevFriendsContext';
import { ChangeSquadModal } from './ChangeSquadModal';

describe('Change squad modal component', () => {
  const dev = devsMockData[0];
  const handleClose = jest.fn();

  const render = (isOpen: boolean, dev: DevDto | null) =>
    appRender(
      <DevFriendsContextProvider>
        <ChangeSquadModal isOpen={isOpen} onClose={handleClose} dev={dev} />
      </DevFriendsContextProvider>,
      {
        providers: ['reactQuery'],
      }
    );

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

  //https://github.com/mswjs/msw/issues/1143

  it('should display a loading indicator when changing the dev squad', async () => {
    devsBySquadQueryHandler({ result: devsMockData });

    const { user } = render(true, dev);

    await screen.findByRole('list', { name: /squads list/i });

    const button = screen.getByRole('button', { name: /squad 2 1 members/i });
    await user.click(button);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i })
    );

    expect(
      screen.getByRole('list', { name: /squads list/i })
    ).toBeInTheDocument();
  });

  //https://github.com/mswjs/msw/issues/1143

  it('should close the modal once the mutation has completed', async () => {
    devsBySquadQueryHandler({ result: devsMockData });

    const { user } = render(true, dev);

    await screen.findByRole('list', { name: /squads list/i });

    const button = screen.getByRole('button', { name: /squad 2 1 members/i });
    await user.click(button);

    await screen.findByRole('progressbar', { name: /circle-loading/i });

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i })
    );

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should display an error message when mutation failed', async () => {
    changeDevSquadMutationHandler({}, 500);

    const { user } = render(true, dev);

    await screen.findByRole('list', { name: /squads list/i });

    const button = screen.getByRole('button', { name: /squad 2 1 members/i });
    await user.click(button);

    await screen.findByText(/oh no!/i);
    screen.getByText(/something went wrong... Sorry!/i);
  });

  it('should close the modal', async () => {
    devsBySquadQueryHandler({ result: devsMockData });

    const { user } = render(true, dev);

    const button = screen.getByRole('button', { name: /nevermind/i });
    await user.click(button);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
