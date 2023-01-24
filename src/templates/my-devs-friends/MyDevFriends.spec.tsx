import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Atom } from 'jotai';
import React from 'react';

import {
  changeDevSquadMutationHandler,
  devsBySquadQueryHandler,
  devsQueryHandler,
  squadsQueryHandler,
} from '@msw';

import { devsMockData, squadsMockData } from '@tests/mock-data';
import { appRender } from '@tests/render/appRender';

import { MyDevFriends } from './MyDevFriends';
import { uiStatusAtom } from '../../state/ui-status.atom';

describe('My dev friends component', () => {
  const render = () => {
    const initialState: [Atom<unknown>, unknown] = [uiStatusAtom, 'loading'];
    return appRender(<MyDevFriends />, {
      providers: ['reactQuery', 'jotai'],
      atoms: [initialState],
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    squadsQueryHandler(squadsMockData, 200);
    devsBySquadQueryHandler({ result: devsMockData });
  });

  it('should display a loading indicator while loading squads & devs', async () => {
    render();

    await screen.findByRole('progressbar', { name: /circle-loading/i });
  });

  it('should display a checkbox by fetched squad', async () => {
    render();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i })
    );

    for (const { name } of squadsMockData) {
      expect(screen.getByRole('checkbox', { name })).toBeInTheDocument();
    }
  });

  it('should display an error message if squads fetching failed', async () => {
    squadsQueryHandler({}, 500);

    render();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i })
    );

    await screen.findByText(/oh no!/i);
    expect(
      screen.getByText(/something went wrong... sorry!/i)
    ).toBeInTheDocument();
  });

  it('should display a list of devs once data has been fetched', async () => {
    devsBySquadQueryHandler({ result: devsMockData });

    render();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i })
    );

    for (const { firstName } of devsMockData) {
      await screen.findByRole('img', { name: `${firstName}` });
    }
  });

  it('should display an error message if devs fetching failed', async () => {
    devsBySquadQueryHandler({ result: devsMockData, status: 400 });

    render();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i })
    );

    await screen.findByText(/oh no!/i);
    expect(
      screen.getByText(/something went wrong... sorry!/i)
    ).toBeInTheDocument();
  });

  it('should filter devs', async () => {
    devsBySquadQueryHandler({
      result: devsMockData,
      resultFilter: (d) => d.idSquad !== 1,
    });

    const { user } = render();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i })
    );

    const squad1Checkbox = await screen.findByRole('checkbox', {
      name: squadsMockData[0].name,
    });

    await user.click(squad1Checkbox);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i })
    );

    const squad1Devs = devsMockData.filter((dev) => dev.idSquad === 1);

    for (const { firstName } of squad1Devs) {
      expect(
        screen.queryByRole('img', { name: firstName })
      ).not.toBeInTheDocument();
    }

    const othersDevs = devsMockData.filter((dev) => dev.idSquad !== 1);
    for (const { firstName } of othersDevs) {
      expect(
        screen.queryByRole('img', { name: firstName })
      ).toBeInTheDocument();
    }
  });

  it('should change the squad of a developer', async () => {
    squadsQueryHandler(squadsMockData);
    devsQueryHandler(devsMockData);
    devsBySquadQueryHandler({
      result: devsMockData,
    });
    changeDevSquadMutationHandler({});

    const { user } = render();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i })
    );

    const button = await screen.findByRole('img', {
      name: devsMockData[0].firstName,
    });
    await user.click(button);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i })
    );

    screen.getByRole('presentation', { name: /change-squad/i });
    screen.getByRole('heading', { name: /move yolo man to another squad/i });
    screen.getByRole('list', { name: /squads list/i });

    const squad2Button = screen.getByRole('button', {
      name: `${squadsMockData[1].name} 1 members`,
    });
    await user.click(squad2Button);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('presentation', { name: /change-squad/i })
    );
  });
});
