import { screen } from '@testing-library/react';
import type { Atom } from 'jotai';
import { describe, it, expect } from 'vitest';

import { appRender } from '@tests/render/appRender';

import type { UiStatus } from '../../../../state/ui-status.atom';
import { uiStatusAtom } from '../../../../state/ui-status.atom';

import { StatusReport } from './StatusReport';

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
      screen.getByText(/something went wrong... sorry!/i),
    ).toBeInTheDocument();
  });

  it('should display a loading indicator', () => {
    render('loading');

    expect(
      screen.getByRole('progressbar', { name: 'circle-loading' }),
    ).toBeInTheDocument();
  });

  it('should display nothing', () => {
    render('ready');

    expect(screen.queryByText(/oh no!/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/something went wrong... sorry!/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('progressbar', { name: 'circle-loading' }),
    ).not.toBeInTheDocument();
  });
});
