import { createMuiTheme } from "@material-ui/core";

export const appTheme = createMuiTheme({
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
