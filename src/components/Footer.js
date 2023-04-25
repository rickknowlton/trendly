import React from "react";
import { Typography, Link, Box } from "@mui/material";

const Footer = ({ darkMode }) => {
  return (
    <>
      <Typography
        p={2}
        color={darkMode ? "#fafafa" : "#1C1932"}
        variant="body2"
      >
        Disclaimer: For educational purposes only. Always consult a financial
        professional before making any investment decisions. Data provided by{" "}
        <Link
          href="https://twitter.com/GoTrendly"
          target="_blank"
          rel="noopener"
          underline="none"
          color={darkMode ? "#5e3" : "#1C1932"}
        >
          TradingView
        </Link>
        .
      </Typography>
      <Box mt={1}>
        <Typography
          pb={1}
          variant="body2"
          color={darkMode ? "#fafafa" : "#1C1932"}
        >
          Contact us on Twitter{" "}
          <Link
            href="https://twitter.com/GoTrendly"
            target="_blank"
            rel="noopener"
            underline="none"
            color={darkMode ? "#5e3" : "#1C1932"}
          >
            @GoTrendly
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
