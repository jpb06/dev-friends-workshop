import clsx from "clsx";
import React from "react";

import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

import { useBlockingErrorStyles } from "./BlockingError.styles";

interface BlockingErrorProps {
  title: string;
  content: string;
  hasMargins?: boolean;
  Icon?: OverridableComponent<SvgIconTypeMap>;
}

export const BlockingError: React.FC<BlockingErrorProps> = ({
  title,
  content,
  hasMargins = true,
  Icon = SentimentDissatisfiedIcon,
}) => {
  const classes = useBlockingErrorStyles();

  return (
    <div
      className={clsx(classes.root, {
        [classes.margins]: hasMargins,
      })}
    >
      <Icon
        className={clsx(classes.errorIcon, classes.spinner)}
        role="errorimg"
      />
      <div className={classes.title}>{title}</div>
      <span className={classes.message}>{content}</span>
    </div>
  );
};
