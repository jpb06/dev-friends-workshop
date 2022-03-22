import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { getDevDescription } from 'templates/my-devs-friends/organisms/list/dev/logic/getDevDescription';

import { devsBySquadQueryHandler } from '@msw';
import { devsMockData } from '@tests/mock-data';

import { DevsList } from './DevsList';

describe('DevsList component', () => {
  afterEach(async () => {
    jest.resetAllMocks();
  });

  it('should display nothing if there is no data', () => {
    devsBySquadQueryHandler([], 400, true);

    render(<DevsList />);

    expect(screen.queryByRole('dev')).not.toBeInTheDocument();
  });

  it('should display nothing if there is no devs', () => {
    devsBySquadQueryHandler([], 200, true);

    render(<DevsList />);

    expect(screen.queryByRole('dev')).not.toBeInTheDocument();
  });

  it('should display something when the search yielded no devs', async () => {
    devsBySquadQueryHandler([], 200, true);

    render(<DevsList />);

    await screen.findByText(/No developers to display/i);
  });

  it('should display a list of devs', async () => {
    devsBySquadQueryHandler(devsMockData, 200, true);

    render(<DevsList />);

    const devs = await screen.findAllByRole('dev');
    expect(devs).toHaveLength(2);

    screen.getByRole('dev', {
      name: getDevDescription(devsMockData[0]),
    });
    screen.getByRole('dev', {
      name: getDevDescription(devsMockData[1]),
    });
  });

  it('should open the modal when a dev is selected', async () => {
    devsBySquadQueryHandler(devsMockData, 200, true);

    render(<DevsList />);

    const button = await screen.findByRole('img', {
      name: devsMockData[0].firstName,
    });
    userEvent.click(button);

    await screen.findByRole('presentation', { name: /change-squad/i });
  });

  it('should close the modal', async () => {
    devsBySquadQueryHandler(devsMockData, 200, true);

    render(<DevsList />);

    const devButton = await screen.findByRole('img', {
      name: devsMockData[0].firstName,
    });
    userEvent.click(devButton);

    await screen.findByRole('presentation', { name: /change-squad/i });

    const closeModalButton = screen.getByRole('button', { name: /nevermind/i });
    userEvent.click(closeModalButton);
  });
});
