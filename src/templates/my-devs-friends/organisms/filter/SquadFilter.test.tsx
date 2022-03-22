import { render, screen } from '@testing-library/react';
import React from 'react';

import { SquadFilter } from './SquadFilter';

describe('SquadFilter component', () => {
  it('should display nothing if there is no squads', () => {
    render(<SquadFilter />);

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('should display one checkbox per squad', () => {
    render(<SquadFilter />);

    expect(screen.queryAllByRole('checkbox')).toHaveLength(3);
    screen.getByRole('checkbox', { name: 'Squad 1' });
    screen.getByRole('checkbox', { name: 'Squad 2' });
    screen.getByRole('checkbox', { name: 'Squad 3' });
  });
});
