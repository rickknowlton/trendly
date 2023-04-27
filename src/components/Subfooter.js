import React from "react";
import { Typography } from "@mui/material";

const Subfooter = ({ theme, darkMode }) => {
  return (
    <Typography
      p={1}
      variant="caption"
      color={darkMode ? theme.palette.primary.text : theme.palette.secondary.text}
    >
      &copy; {new Date().getFullYear()} Trendly. All rights reserved.
    </Typography>
  );
};

export default Subfooter;
