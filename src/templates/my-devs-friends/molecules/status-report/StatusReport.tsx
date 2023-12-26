import { useAtom } from 'jotai';
import { match } from 'ts-pattern';

import { CircularLoading } from '@molecules';

import { uiStatusAtom } from '../../../../state/ui-status.atom';
import { ErrorBlock } from '../error-block/ErrorBlock';

export const StatusReport = () => {
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
