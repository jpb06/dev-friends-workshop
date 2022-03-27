import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import React from 'react';

import { useSquadsQuery } from '@api/main-backend';

import { useReportOnErrors } from '../../hooks/useReportOnErrors';
import { useSelectedSquadsInitialization } from './hooks/useSelectedSquadsInitialization';
import { useSquadsSelectionChange } from './hooks/useSquadsSelectionChange';

export const SquadFilter: React.FC = () => {
  const { data: squads, isError } = useSquadsQuery();

  useSelectedSquadsInitialization(squads);
  useReportOnErrors(isError);

  const [handleChange, formValues] = useSquadsSelectionChange();

  if (!squads) {
    return null;
  }

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      {squads.map((el, index) => (
        <Grid item key={el.id}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formValues[index]}
                onChange={handleChange}
                name={`${index}`}
                sx={{
                  transform: 'scale(1.5)',
                }}
              />
            }
            label={`Squad ${el.squad}`}
          />
        </Grid>
      ))}
    </Grid>
  );
};
