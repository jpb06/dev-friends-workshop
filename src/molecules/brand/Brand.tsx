import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { Grid, Typography } from '@mui/material';
import type { FunctionComponent } from 'react';

import type { AppColor } from '@theme';

import { withThemeColor } from './Brand.styles';

export type BrandProps = {
  color: AppColor;
  centered?: boolean;
  withBottomMargin?: boolean;
  big?: boolean;
};

export const Brand: FunctionComponent<BrandProps> = ({
  color,
  centered = false,
  withBottomMargin = false,
  big = false,
}) => {
  const withMainColor = withThemeColor(color);

  const justifyContent = centered ? 'center' : 'flex-start';

  return (
    <>
      <Grid
        container={true}
        direction="row"
        justifyContent={justifyContent}
        alignItems="flex-start"
        sx={{ mb: withBottomMargin ? 2 : 0 }}
      >
        <Grid>
          <EmojiPeopleIcon sx={withMainColor} />
        </Grid>
        <Grid>
          <Typography
            variant={big ? 'h4' : 'h6'}
            sx={{
              flexGrow: 1,
              ...withMainColor,
            }}
          >
            My dev friends
          </Typography>
        </Grid>
      </Grid>
      <Grid container={true} justifyContent={justifyContent}>
        <Grid
          sx={{
            fontSize: 15,
            ...withThemeColor('darkCyan'),
          }}
        >
          Sandbox
        </Grid>
      </Grid>
    </>
  );
};
