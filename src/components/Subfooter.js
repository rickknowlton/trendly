import React from "react";
import { Typography } from "@mui/material";

const Subfooter = ({ darkMode }) => {
  return (
    <Typography
      p={1}
      variant="caption"
      color={darkMode ? "primary.text" : "secondary.text"}
    >
      &copy; {new Date().getFullYear()} Trendly. All rights reserved.
    </Typography>
  );
};

export default Subfooter;
