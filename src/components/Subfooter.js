import React from "react";
import { Typography } from "@mui/material";

const Subfooter = ({ darkMode }) => {
  return (
    <Typography
      p={1}
      variant="caption"
      color={darkMode ? "#fafafa" : "#1C1932"}
    >
      &copy; {new Date().getFullYear()} Trendly. All rights reserved.
    </Typography>
  );
};

export default Subfooter;
