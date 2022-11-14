import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import React from 'react';

import { useSquadsFilterForm } from './hooks/useSquadsFilterForm';

export const SquadFilter = () => {
  const { handleChange, formValues, squads } = useSquadsFilterForm();

  if (!squads) {
    return null;
  }

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      {squads.map(({ id, name }, index) => (
        <Grid item key={id}>
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
            label={name}
          />
        </Grid>
      ))}
    </Grid>
  );
};
