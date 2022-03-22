import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';

import { devsBySquadQueryHandler, squadsQueryHandler } from '@msw';
import { devsMockData, squadsMockData } from '@tests/mock-data';

import { MyDevFriends } from './MyDevFriends';

describe('My dev friends component', () => {
  beforeAll(() => {
    squadsQueryHandler(squadsMockData, 200, true);
    devsBySquadQueryHandler(devsMockData, 200, true);
  });

  it('should display a loading indicator', () => {
    render(<MyDevFriends />);

    screen.getByRole('progressbar', { name: /circle-loading/i });
  });

  it('should display a list of devs once data has been fetched', async () => {
    render(<MyDevFriends />);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i })
    );
  });

  it('should display nothing if devs fetching failed', async () => {
    devsBySquadQueryHandler(devsMockData, 400, true);

    render(<MyDevFriends />);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /circle-loading/i })
    );
  });
});
