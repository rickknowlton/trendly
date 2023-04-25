import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingIndicator = () => {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingIndicator;
