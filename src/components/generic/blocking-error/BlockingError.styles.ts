import { alpha, makeStyles, Theme } from '@material-ui/core';
import { cyan } from '@material-ui/core/colors';

export const useBlockingErrorStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: 'center',
    color: alpha(cyan[700], 0.8),
  },
  margins: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  title: {
    fontSize: 'xx-large',
    fontweight: 600,
  },
  message: {
    color: 'white',
  },
  errorIcon: {
    height: 100,
    width: 100,
  },
  spinner: {
    animationName: '$spin',
    animationDuration: '600ms',
    animationIterationCount: '1',
    animationTimingFunction: 'linear',
  },
  '@keyframes spin': {
    from: { transform: 'rotate(180deg)' },
    to: { transform: 'rotate(0deg)' },
  },
}));
