import { useContext, useEffect } from "react";

import { DevFriendsContext } from "../contexts/DevFriendsContext.context";

export const useReportOnErrors = (isError: boolean): void => {
  const { setStatus } = useContext(DevFriendsContext);

  useEffect(() => {
    if (isError) setStatus("errored");
  }, [isError]);
};
