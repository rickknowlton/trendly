import React from "react";
import { Typography, Link, Box } from "@mui/material";
import { FooterTypography } from "./styledComponents";

const Footer = ({ theme, darkMode }) => {
  return (
    <>
      <FooterTypography
        p={2}
        color={
          darkMode ? theme.palette.primary.text : theme.palette.secondary.text
        }
        variant="body2"
      >
        Disclaimer: For educational purposes only. Always consult a financial
        professional before making any investment decisions. Data provided by{" "}
        <Link
          href="https://twitter.com/GoTrendly"
          target="_blank"
          rel="noopener"
          underline="none"
          color={
            darkMode
              ? theme.palette.primary.accent
              : theme.palette.secondary.accent
          }
        >
          TradingView
        </Link>{" "}
        may be delayed.
      </FooterTypography>
      <Box mt={1}>
        <Typography
          pb={1}
          variant="body2"
          color={
            darkMode ? theme.palette.primary.text : theme.palette.secondary.text
          }
        >
          Contact us on Twitter{" "}
          <Link
            href="https://twitter.com/GoTrendly"
            target="_blank"
            rel="noopener"
            underline="none"
            color={
              darkMode
                ? theme.palette.primary.accent
                : theme.palette.secondary.accent
            }
          >
            @GoTrendly
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
