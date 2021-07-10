import { createTheme } from '@material-ui/core';

export const appTheme = createTheme({
  palette: {
    type: "dark",
    background: { paper: "darkslategray" },
    primary: {
      main: "#49a39f",
    },
    secondary: {
      main: "#0d3c59",
    },
  },
});
