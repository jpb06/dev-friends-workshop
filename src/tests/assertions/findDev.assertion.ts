import { screen } from '@testing-library/react';

import { DevDto } from '../../api/main-backend/specs/api-types';
import { squadsMockData } from '../mock-data';

export const findDev = async (dev: DevDto) => {
  await screen.findByRole('listitem', {
    name: `${dev.firstName} - ${
      squadsMockData.find((s) => s.id === dev.idSquad)?.name
    }`,
  });
};
