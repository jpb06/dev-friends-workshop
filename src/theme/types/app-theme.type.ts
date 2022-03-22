import { Theme } from '@mui/material';

import { AppColor } from './app-color.type';

export interface AppTheme extends Theme {
  colors: {
    [key in AppColor]: string;
  };
}
