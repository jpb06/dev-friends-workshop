import { screen } from '@testing-library/react';
import React from 'react';

import { appRender } from '@tests/render/appRender';
import { DevFriendsContextProvider } from '@tests/render/providers/DevFriendsContextProvider';

import { DevFriendsStatus } from '../../MyDevFriends';
import { StatusReport } from './StatusReport';

describe('Status report component', () => {
  const render = (status: DevFriendsStatus) => {
    const wrapper = DevFriendsContextProvider({
      status,
      selectedSquads: [],
      setStatus: jest.fn(),
      setSelectedSquads: jest.fn(),
    });

    return appRender(<StatusReport />, {
      additionalWrappers: [wrapper],
    });
  };

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
