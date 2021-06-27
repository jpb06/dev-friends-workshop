import React from 'react';

import { useSquadsQuery } from '@api/main-backend/useSquadsQuery';
import { useReportOnErrors } from '@components/dev-friends/hooks/useReportOnErrors';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';

import { useSelectedSquadsInitialization } from './hooks/useSelectedSquadsInitialization';
import { useSquadsSelectionChange } from './hooks/useSquadsSelectionChange';
import { useSquadFilterStyles } from './SquadFilter.styles';

export const SquadFilter: React.FC = () => {
  const classes = useSquadFilterStyles();

  const { data: squads, isError } = useSquadsQuery();

  useSelectedSquadsInitialization(squads);
  useReportOnErrors(isError);

  const [handleChange, formValues] = useSquadsSelectionChange();

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
