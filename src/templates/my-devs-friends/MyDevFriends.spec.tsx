import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('My dev friends component', () => {
  const render = () =>
    appRender(<MyDevFriends />, { providers: ['reactQuery'] });

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

    await waitForElementToBeRemoved(
      screen.getByRole('progressbar', { name: /circle-loading/i })
    );

    for (const { squad } of squadsMockData) {
      expect(
        screen.getByRole('checkbox', { name: `Squad ${squad}` })
      ).toBeInTheDocument();
    }
  });

  it('should display an error message if squads fetching failed', async () => {
    squadsQueryHandler({}, 500);

    render();

    await waitForElementToBeRemoved(
      screen.getByRole('progressbar', { name: /circle-loading/i })
    );

    await screen.findByText(/oh no!/i);
    expect(
      screen.getByText(/something went wrong... sorry!/i)
    ).toBeInTheDocument();
  });

  it('should display a list of devs once data has been fetched', async () => {
    devsBySquadQueryHandler({ result: devsMockData });

    render();

    await waitForElementToBeRemoved(
      screen.getByRole('progressbar', { name: /circle-loading/i })
    );

    for (const { firstName } of devsMockData) {
      await screen.findByRole('img', { name: `${firstName}` });
    }
  });

  it('should display an error message if devs fetching failed', async () => {
    devsBySquadQueryHandler({ result: devsMockData, status: 400 });

    render();

    await waitForElementToBeRemoved(
      screen.getByRole('progressbar', { name: /circle-loading/i })
    );

    await screen.findByText(/oh no!/i);
    expect(
      screen.getByText(/something went wrong... sorry!/i)
    ).toBeInTheDocument();
  });

  it('should filter devs', async () => {
    devsBySquadQueryHandler({
      result: devsMockData,
      resultFilter: (d) => d.squad !== 1,
    });

    render();

    await waitForElementToBeRemoved(
      screen.getByRole('progressbar', { name: /circle-loading/i })
    );

    const squad1Checkbox = await screen.findByRole('checkbox', {
      name: `Squad 1`,
    });
    userEvent.click(squad1Checkbox);

    await waitForElementToBeRemoved(
      screen.getByRole('progressbar', { name: /circle-loading/i })
    );

    const squad1Devs = devsMockData.filter((dev) => dev.squad === 1);

    for (const { firstName } of squad1Devs) {
      expect(
        screen.queryByRole('img', { name: firstName })
      ).not.toBeInTheDocument();
    }

    const othersDevs = devsMockData.filter((dev) => dev.squad !== 1);
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

    render();

    await waitForElementToBeRemoved(
      screen.getByRole('progressbar', { name: /circle-loading/i })
    );

    const button = await screen.findByRole('img', {
      name: devsMockData[0].firstName,
    });
    userEvent.click(button);

    await waitForElementToBeRemoved(
      screen.getByRole('progressbar', { name: /circle-loading/i })
    );

    screen.getByRole('presentation', { name: /change-squad/i });
    screen.getByRole('heading', { name: /move yolo man to another squad/i });
    screen.getByRole('list', { name: /squads list/i });

    const squad2Button = screen.getByRole('button', {
      name: 'Squad 2 1 members',
    });
    userEvent.click(squad2Button);

    await waitForElementToBeRemoved(
      screen.getByRole('progressbar', { name: /circle-loading/i })
    );
    await waitForElementToBeRemoved(
      screen.getByRole('presentation', { name: /change-squad/i })
    );
  });
});
