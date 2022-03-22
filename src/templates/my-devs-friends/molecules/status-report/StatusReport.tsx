import { BlockingError } from 'molecules/blocking-error/BlockingError';
import { CircularLoading } from 'molecules/circular-loading/CircularLoading';
import React from 'react';

import { DevFriendsStatus } from '../../MyDevFriends';

interface StatusReportProps {
  status: DevFriendsStatus;
}

export const StatusReport: React.FC<StatusReportProps> = ({ status }) => (
  <>
    {
      {
        loading: <CircularLoading />,
        errored: (
          <BlockingError
            title="Oh no!"
            content="Something went wrong... Sorry!"
          />
        ),
      }[status]
    }
  </>
);
