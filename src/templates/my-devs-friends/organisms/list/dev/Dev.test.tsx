import { screen } from '@testing-library/react';
import { Atom } from 'jotai';
import React from 'react';

import { appRender } from '@tests/render';

import { squadsQueryHandler } from '../../../../../api/main-backend/msw-handlers';
import { findDev } from '../../../../../tests/assertions/findDev.assertion';
import { devsMockData, squadsMockData } from '../../../../../tests/mock-data';
import { Dev } from './Dev';

describe('Dev component', () => {
  const dev = devsMockData[0];
  const onSelected = jest.fn();

  const render = (
    Component: JSX.Element,
    initialState?: Array<[Atom<unknown>, unknown]>
  ) => {
    return appRender(Component, {
      providers: ['reactQuery', 'jotai'],
      atoms: initialState,
    });
  };

  beforeEach(() => {
    squadsQueryHandler(squadsMockData);
  });

  it('should display a dev', async () => {
    render(<Dev {...dev} onSelected={onSelected} />);

    await findDev(dev);
  });

  it('should display a picture for the dev', () => {
    render(<Dev {...dev} onSelected={onSelected} />);

    expect(
      screen.getByRole('img', { name: dev.firstName })
    ).toBeInTheDocument();
  });

  it('should call onSelected when clicked', async () => {
    const { user } = render(<Dev {...dev} onSelected={onSelected} />);

    const button = screen.getByRole('img', { name: dev.firstName });
    await user.click(button);

    expect(onSelected).toHaveBeenCalledTimes(1);
  });
});
