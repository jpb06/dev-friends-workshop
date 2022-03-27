import { useContext, useEffect } from 'react';

import { DevFriendsContext } from '../contexts/DevFriendsContext';

export const useReportOnErrors = (
  isError: boolean,
  isFetched: boolean,
  data?: Array<unknown>
): void => {
  const { setStatus } = useContext(DevFriendsContext);

  useEffect(() => {
    if (isError || (isFetched && !data)) {
      setStatus('errored');
    }
  }, [isError, isFetched, data, setStatus]);
};
