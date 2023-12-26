import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { uiStatusAtom } from '../../../state/ui-status.atom';

export const useReportOnErrors = (
  isError: boolean,
  isFetched: boolean,
  data?: unknown[],
): void => {
  const [, setUiStatus] = useAtom(uiStatusAtom);

  useEffect(() => {
    if (isError || (isFetched && !data)) {
      setUiStatus('errored');
    }
  }, [isError, isFetched, data, setUiStatus]);
};
