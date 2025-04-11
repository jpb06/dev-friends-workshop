import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import type { Atom } from 'jotai';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  changeDevSquadMutationHandler,
  devsBySquadQueryHandler,
  devsQueryHandler,
  squadsQueryHandler,
} from '@msw';
import { devsMockData, squadsMockData } from '@tests/mock-data';
import { appRender } from '@tests/render/appRender';

import { selectedSquadsAtom } from '../../../../state/selected-squads.atom';
import { findDev } from '../../../../tests/assertions/findDev.assertion';

import { DevsList } from './DevsList';

describe('DevsList component', () => {
  const render = (initialState: [Atom<unknown>, unknown][] = []) =>
    appRender(<DevsList />, {
      providers: ['reactQuery', 'jotai'],
      atoms: initialState,
    });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should display nothing if there is no data', async () => {
    await devsBySquadQueryHandler({ result: [], status: 400 });

    render();

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should display nothing if there is no devs', async () => {
    await devsBySquadQueryHandler({ result: [] });

    render();

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should display nothing if devs fetching failed', async () => {
    await devsBySquadQueryHandler({ result: {}, status: 500 });

    render([[selectedSquadsAtom, squadsMockData]]);

    render();

    await waitFor(() => {
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });
  });

  it('should display something when the search yielded no devs', async () => {
    await devsBySquadQueryHandler({ result: [] });

    render([[selectedSquadsAtom, squadsMockData]]);

    await screen.findByText(/no results/i);
    screen.getAllByTestId('InfoIcon');
  });

  it('should display a list of devs', async () => {
    await Promise.all([
      squadsQueryHandler(squadsMockData),
      devsBySquadQueryHandler({ result: devsMockData }),
    ]);

    render([[selectedSquadsAtom, squadsMockData]]);

    const devs = await screen.findAllByRole('listitem');
    expect(devs).toHaveLength(2);

    await findDev(devsMockData[0]);
    await findDev(devsMockData[1]);
  });

  it('should open the modal when a dev is selected', async () => {
    await Promise.all([
      devsBySquadQueryHandler({ result: devsMockData }),
      devsQueryHandler(devsMockData),
      squadsQueryHandler(squadsMockData),
    ]);

    const dev = devsMockData[0];

    const { user } = render([[selectedSquadsAtom, squadsMockData]]);

    const button = await screen.findByRole('img', {
      name: dev.firstName,
    });
    await user.click(button);

    await screen.findByRole('presentation', { name: /change-squad/i });
    screen.getByRole('heading', {
      name: `Move ${dev.firstName} to another squad`,
    });
    screen.getByRole('button', { name: 'Nevermind' });
  });

  it('should close the modal', async () => {
    await Promise.all([
      devsBySquadQueryHandler({ result: devsMockData }),
      devsQueryHandler(devsMockData, 200),
      squadsQueryHandler(squadsMockData, 200),
    ]);

    const { user } = render([[selectedSquadsAtom, squadsMockData]]);

    const devButton = await screen.findByRole('img', {
      name: devsMockData[0].firstName,
    });

    await user.click(devButton);

    await screen.findByRole('presentation', { name: /change-squad/i });

    const closeModalButton = screen.getByRole('button', { name: /nevermind/i });
    await user.click(closeModalButton);
  });

  it('should display the list of squads our chosen dev can join', async () => {
    await Promise.all([
      devsBySquadQueryHandler({ result: devsMockData }),
      devsQueryHandler(devsMockData, 200),
      squadsQueryHandler(squadsMockData, 200),
    ]);

    const dev = devsMockData[0];

    const { user } = render([[selectedSquadsAtom, squadsMockData]]);

    const button = await screen.findByRole('img', {
      name: dev.firstName,
    });
    await user.click(button);

    await screen.findByRole('presentation', { name: /change-squad/i });
    await screen.findByRole('list', { name: /squads list/i });

    screen.getByRole('button', { name: 'Cool 1 members' });
    screen.getByRole('button', { name: 'Bros 0 members' });
  });

  it('should move the dev to another squad', async () => {
    await Promise.all([
      devsBySquadQueryHandler({ result: devsMockData }),
      devsQueryHandler(devsMockData, 200),
      squadsQueryHandler(squadsMockData, 200),
      changeDevSquadMutationHandler({ cool: 'bro' }, 200),
    ]);

    const dev = devsMockData[0];

    const { user } = render([[selectedSquadsAtom, squadsMockData]]);

    const button = await screen.findByRole('img', {
      name: dev.firstName,
    });
    await user.click(button);

    await screen.findByRole('presentation', { name: /change-squad/i });

    const squadButton = await screen.findByRole('button', {
      name: 'Bros 0 members',
    });
    await user.click(squadButton);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('presentation', { name: /change-squad/i }),
    );
  });
});
