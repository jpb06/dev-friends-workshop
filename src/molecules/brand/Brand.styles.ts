import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

import { AppColor, appTheme } from '@theme';

export const withThemeColor = (color: AppColor): SxProps<Theme> => {
  return {
    color: appTheme.colors[color],
  };
};
