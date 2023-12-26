import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { Grid, Typography } from '@mui/material';

import type { AppColor } from '@theme';

import { withThemeColor } from './Brand.styles';

export type BrandProps = {
  color: AppColor;
  centered?: boolean;
  withBottomMargin?: boolean;
  big?: boolean;
};

export const Brand = ({
  color,
  centered = false,
  withBottomMargin = false,
  big = false,
}: BrandProps) => {
  const withMainColor = withThemeColor(color);

  const justifyContent = centered ? 'center' : 'flex-start';

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent={justifyContent}
        alignItems="flex-start"
        sx={{ mb: withBottomMargin ? 2 : 0 }}
      >
        <Grid item>
          <EmojiPeopleIcon sx={withMainColor} />
        </Grid>
        <Grid item>
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
      <Grid container justifyContent={justifyContent}>
        <Grid
          item
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
