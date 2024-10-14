import { blue, lightBlue } from "@mui/material/colors";
const { createTheme } = require("@mui/material/styles");

export const theme = createTheme({
  palette: {
    primary: {
      main: "#055fa3",
    },
    secondary: {
      main: "#0b6ade",
      midNightBlue: "#011533",
      lightBlue: "#75aaeb",
    },
  },
});
