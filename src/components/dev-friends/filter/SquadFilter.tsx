import React from "react";

import { useSquadsQuery } from "@api/useSquadsQuery.hook";
import { useReportOnErrors } from "@components/dev-friends/hooks/useReportOnErrors.hook";
import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";

import { useSelectedSquadsInitialization } from "./hooks/useSelectedSquadsInitialization.hook";
import { useSquadsSelectionChange } from "./hooks/useSquadsSelectionChange.hook";
import { useSquadFilterStyles } from "./SquadFilter.styles";

export const SquadFilter: React.FC = () => {
  const classes = useSquadFilterStyles();

  const { data: squads, isError } = useSquadsQuery();

  useSelectedSquadsInitialization(squads);
  const [handleChange, formValues] = useSquadsSelectionChange();
  useReportOnErrors(isError);

  if (!squads) return null;

  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      {squads.map((el, index) => (
        <FormControlLabel
          key={el.id}
          control={
            <Checkbox
              checked={formValues[index]}
              onChange={handleChange}
              className={classes.checkBox}
              name={`${index}`}
            />
          }
          label={`Squad ${el.squad}`}
        />
      ))}
    </Grid>
  );
};
