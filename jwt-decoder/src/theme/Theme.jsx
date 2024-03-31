// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#303030",
      paper: "#C9C9C9",
    },
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontSize: 15,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontFamily: "Oswald",
  },
});

export default theme;
