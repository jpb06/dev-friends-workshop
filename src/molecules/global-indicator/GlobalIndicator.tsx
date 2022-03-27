import { Box, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { alpha } from '@mui/material/styles';
import React from 'react';

import { spinKeyframe } from '@logic/keyframes/spin.keyframe';
import { CenteredBlock } from '@molecules';
import { appTheme } from '@theme';

export type GlobalIndicatorProps = {
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
};

export const GlobalIndicator: React.FC<GlobalIndicatorProps> = ({
  title,
  Icon,
  children,
}) => (
  <CenteredBlock>
    <Box
      component="div"
      sx={{
        textAlign: 'center',
        color: alpha(appTheme.colors.lightRed, 0.8),
        marginTop: 0,
      }}
    >
      <Icon
        sx={{
          height: 100,
          width: 100,
          animation: `${spinKeyframe} 1.5s linear`,
        }}
      />
      <Box
        component="div"
        sx={{
          fontSize: 'x-large',
          fontWeight: '600',
        }}
      >
        {title}
      </Box>
      <Box component="span" sx={{ color: appTheme.colors.cyan }}>
        {children}
      </Box>
    </Box>
  </CenteredBlock>
);
