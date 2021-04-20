import { useIsFetching } from "react-query";

import { LinearProgress } from "@material-ui/core";

import { useGlobalLoadingIndicatorStyles } from "./GlobalLoadingIndicator.styles";

export const GlobalLoadingIndicator = (): JSX.Element => {
  const classes = useGlobalLoadingIndicatorStyles();
  const isFetching = useIsFetching();

  if (!isFetching) {
    return null;
  }

  return (
    <LinearProgress
      color="secondary"
      className={classes.progress}
      title="app-is-loading"
    />
  );
};
