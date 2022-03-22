import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { alpha, Box, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { cyan } from '@mui/material/colors';
import React from 'react';

import { spinKeyframe } from '@logic/keyframes/spin.keyframe';

interface BlockingErrorProps {
  title: string;
  content: string;
  //hasMargins?: boolean;
  Icon?: OverridableComponent<SvgIconTypeMap>;
}

export const BlockingError: React.FC<BlockingErrorProps> = ({
  title,
  content,
  //hasMargins = true,
  Icon = SentimentDissatisfiedIcon,
}) => (
  <Box
    component="div"
    sx={{
      textAlign: 'center',
      color: alpha(cyan[700], 0.8),
      //
      marginTop: 1,
      marginBottom: 5,
    }}
  >
    <Icon
      role="errorimg"
      sx={{
        height: 100,
        width: 100,
        animation: `${spinKeyframe} 2s linear`,
      }}
    />
    <Box component="div" sx={{ fontSize: 'xx-large', fontweight: 600 }}>
      {title}
    </Box>
    <Box component="span" sx={{ color: 'white' }}>
      {content}
    </Box>
  </Box>
);
