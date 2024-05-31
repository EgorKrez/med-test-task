import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#F9F9F9",
      main: "#13A3B9",
      contrastText: "#FFFFFF",
    },
    success: {
      light: "#EAFBF5",
      main: "#13A3B9",
      contrastText: "#22B07D",
    },
    grey: {
      "50": "#EDEDF4",
      "100": "#D4D7DB",
      A100: "#F6F6F9",
      "200": "#A7B4CC",
      A200: "#4D4D4F",
      "300": "#A8AAAE",
      "400": "#C4C4C4",
      "500": "#676A71",
      "600": "#6E7686",
      "900": "#272A33",
    },
  },
});
