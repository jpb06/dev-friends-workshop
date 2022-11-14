import { useAtom } from 'jotai';
import React from 'react';

import { CircularLoading } from '@molecules';

import { uiStatusAtom } from '../../../../state/ui-status.atom';
import { ErrorBlock } from '../error-block/ErrorBlock';

export const StatusReport = () => {
  const [uiStatus] = useAtom(uiStatusAtom);

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
        }[uiStatus]
      }
    </>
  );
};
