import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { squadsQueryHandler } from '@msw';
import { squadsMockData } from '@tests/mock-data';
import { appRender } from '@tests/render/appRender';

import { SquadFilter } from './SquadFilter';

describe('SquadFilter component', () => {
  const render = () =>
    appRender(<SquadFilter />, {
      providers: ['reactQuery', 'jotai'],
    });

  it('should display nothing if there is no squads', async () => {
    await squadsQueryHandler(squadsMockData, 200);

    render();

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('should display one checkbox per squad', async () => {
    await squadsQueryHandler(squadsMockData, 200);

    render();

    await screen.findAllByRole('checkbox');

    expect(screen.queryAllByRole('checkbox')).toHaveLength(3);
    for (const { name } of squadsMockData) {
      screen.getByRole('checkbox', { name });
    }
  });
});
