import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

import { AppColor, appTheme } from '@theme';

export const withThemeColor = (color: AppColor): SxProps<Theme> => ({
  color: appTheme.colors[color],
});
