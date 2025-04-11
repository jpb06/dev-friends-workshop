import { useAtom } from 'jotai';
import type { FunctionComponent } from 'react';
import { match } from 'ts-pattern';

import { CircularLoading } from '@molecules';

import { uiStatusAtom } from '../../../../state/ui-status.atom';
import { ErrorBlock } from '../error-block/ErrorBlock';

export const StatusReport: FunctionComponent = () => {
  const [uiStatus] = useAtom(uiStatusAtom);

  return (
    <>
      {match(uiStatus)
        .with('loading', () => <CircularLoading />)
        .with('errored', () => (
          <ErrorBlock title="Oh no!">Something went wrong... Sorry!</ErrorBlock>
        ))
        .otherwise(() => null)}
    </>
  );
};
