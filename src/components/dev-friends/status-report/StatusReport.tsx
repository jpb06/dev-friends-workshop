import React from 'react';

import { DevFriendsStatus } from '@components/dev-friends/MyDevFriends';
import { BlockingError } from '@components/generic/blocking-error/BlockingError';
import { CircularLoading } from '@components/generic/circular-loading/CircularLoading';

interface StatusReportProps {
  status: DevFriendsStatus;
}

export const StatusReport: React.FC<StatusReportProps> = ({
  status,
}): JSX.Element => (
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
