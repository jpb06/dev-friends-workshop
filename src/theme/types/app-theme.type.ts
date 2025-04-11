import type { Theme } from '@mui/material';

import type { AppColor } from './app-color.type';

export interface AppTheme extends Theme {
  colors: {
    [key in AppColor]: string;
  };
}
