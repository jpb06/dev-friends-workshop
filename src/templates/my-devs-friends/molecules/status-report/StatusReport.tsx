import React, { useContext } from 'react';

import { CircularLoading } from '@molecules';

import { DevFriendsContext } from '../../contexts/DevFriendsContext';
import { ErrorBlock } from '../error-block/ErrorBlock';

export const StatusReport = () => {
  const { status } = useContext(DevFriendsContext);

  return (
    <>
      {
        {
          loading: <CircularLoading />,
          errored: (
            <ErrorBlock title="Oh no!">
              Something went wrong... Sorry!
            </ErrorBlock>
          ),
        }[status]
      }
    </>
  );
};
