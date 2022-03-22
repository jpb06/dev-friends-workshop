import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import React from 'react';
import { useReportOnErrors } from 'templates/my-devs-friends/hooks/useReportOnErrors';

import { useSquadsQuery } from '@api/main-backend';

import { useSelectedSquadsInitialization } from './hooks/useSelectedSquadsInitialization';
import { useSquadsSelectionChange } from './hooks/useSquadsSelectionChange';

export const SquadFilter: React.FC = () => {
  const { data: squads, isError } = useSquadsQuery();

  useSelectedSquadsInitialization(squads);
  useReportOnErrors(isError);

  const [handleChange, formValues] = useSquadsSelectionChange();

  if (!squads) return null;

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      {squads.map((el, index) => (
        <FormControlLabel
          key={el.id}
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
      ))}
    </Grid>
  );
};
