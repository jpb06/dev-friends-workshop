import React from 'react';

import { CircularLoading } from '@molecules';

import { DevFriendsStatus } from '../../MyDevFriends';
import { ErrorBlock } from '../error-block/ErrorBlock';

interface StatusReportProps {
  status: DevFriendsStatus;
}

export const StatusReport: React.FC<StatusReportProps> = ({ status }) => (
  <>
    {
      {
        loading: <CircularLoading />,
        errored: (
          <ErrorBlock title="Oh no!">Something went wrong... Sorry!</ErrorBlock>
        ),
      }[status]
    }
  </>
);
