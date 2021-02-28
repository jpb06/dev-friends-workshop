import { useContext, useEffect } from "react";

import { DevFriendsContext } from "../contexts/DevFriendsContext.context";

export const useReportOnReady = (data?: Array<unknown>): void => {
  const { setStatus } = useContext(DevFriendsContext);

  useEffect(() => {
    if (!data) return;

    setStatus("ready");
  }, [data]);
};
