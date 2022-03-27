import { screen } from '@testing-library/react';
import React from 'react';

import { squadsQueryHandler } from '@api/main-backend/msw-handlers';
import { squadsMockData } from '@tests/mock-data';
import { appRender } from '@tests/render/appRender';

import { DevFriendsContextProvider } from '../../contexts/DevFriendsContext';
import { SquadFilter } from './SquadFilter';

describe('SquadFilter component', () => {
  const render = () => {
    return appRender(
      <DevFriendsContextProvider>
        <SquadFilter />
      </DevFriendsContextProvider>,
      {
        providers: ['reactQuery'],
      }
    );
  };

  it('should display nothing if there is no squads', () => {
    squadsQueryHandler(squadsMockData, 200);

    render();

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('should display one checkbox per squad', async () => {
    squadsQueryHandler(squadsMockData, 200);

    render();

    await screen.findAllByRole('checkbox');

    expect(screen.queryAllByRole('checkbox')).toHaveLength(3);
    screen.getByRole('checkbox', { name: 'Squad 1' });
    screen.getByRole('checkbox', { name: 'Squad 2' });
    screen.getByRole('checkbox', { name: 'Squad 5' });
  });
});
