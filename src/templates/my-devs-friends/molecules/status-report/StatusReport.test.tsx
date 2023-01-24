import { screen } from '@testing-library/react';
import { Atom } from 'jotai';
import React from 'react';

import { appRender } from '@tests/render/appRender';

import { StatusReport } from './StatusReport';
import { UiStatus, uiStatusAtom } from '../../../../state/ui-status.atom';

describe('Status report component', () => {
  const render = (status: UiStatus) =>
    appRender(<StatusReport />, {
      providers: ['jotai'],
      atoms: [[uiStatusAtom, status]] as Array<[Atom<unknown>, unknown]>,
    });

  it('should display an error', () => {
    render('errored');

    expect(screen.getByText(/oh no!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/something went wrong... sorry!/i)
    ).toBeInTheDocument();
  });

  it('should display a loading indicator', () => {
    render('loading');

    expect(
      screen.getByRole('progressbar', { name: 'circle-loading' })
    ).toBeInTheDocument();
  });

  it('should display nothing', () => {
    render('ready');

    expect(screen.queryByText(/oh no!/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/something went wrong... sorry!/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('progressbar', { name: 'circle-loading' })
    ).not.toBeInTheDocument();
  });
});
