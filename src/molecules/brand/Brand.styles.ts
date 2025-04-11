import type { Theme } from '@mui/material';
import type { SxProps } from '@mui/system';

import { type AppColor, appTheme } from '@theme';

export const withThemeColor = (color: AppColor): SxProps<Theme> => ({
  color: appTheme.colors[color],
});
