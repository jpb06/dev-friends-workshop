import { faker } from '@faker-js/faker';

import { DevDto } from '@api/main-backend/specs/api-types';

export const devsMockData: DevDto[] = [
  {
    id: 1,
    idSquad: 1,
    firstName: 'Yolo man',
    avatar: faker.image.avatar(),
  },
  {
    id: 2,
    idSquad: 2,
    firstName: 'Cool girl',
    avatar: faker.image.avatar(),
  },
];
