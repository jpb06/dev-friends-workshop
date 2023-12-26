import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { uiStatusAtom } from '../../../state/ui-status.atom';

export const useReportOnReady = (data?: unknown[]): void => {
  const [, setUiStatus] = useAtom(uiStatusAtom);

  useEffect(() => {
    if (!data) {
      return;
    }

    setUiStatus('ready');
  }, [data, setUiStatus]);
};
