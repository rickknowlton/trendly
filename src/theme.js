import { createTheme } from "@mui/material/styles";

const createAppTheme = (darkMode) => {
  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#27224B",
        text: "#fafafa",
        accent: "#55EE33",
      },
      secondary: {
        main: "#F2F1F9",
        text: "#1C1932",
        accent: "#6F33EE",
      },
      background: {
        default: darkMode ? "#1C1932" : "#fafafa",
      },
    },
  });
};

export default createAppTheme;
