/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import {
  TextField,
  Container,
  Box,
  Fab,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";
import { styled } from "@mui/system";
import { Typography, Link, Skeleton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import InputAdornment from "@mui/material/InputAdornment";
import { ReactComponent as Logo } from "./assets/images/trendly-txt-fade.svg";
import { GlobalStyles } from "@mui/system";

const RootContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "0 !important",
  backgroundColor: theme.palette.background.default,
  maxWidth: "500px",
  minWidth: "500px",
  margin: "0 auto",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)", // Added boxShadow property
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingBottom: theme.spacing(8),
  backgroundColor: theme.palette.background.default,
  maxWidth: "500px",
  minWidth: "500px",
  margin: "0 auto",
}));

const FooterContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  maxWidth: "500px",
  minWidth: "500px",
  padding: "0 !important", // Added padding to ensure the footer does not overlap content
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(1),
  right: theme.spacing(1),
  height: "2.2rem",
  width: "2.2rem",
}));

const Footer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: "auto",
}));

const Subfooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  fontSize: "0.8rem",
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

function App() {
  const [ticker, setTicker] = useState("SPY");
  const [darkMode, setDarkMode] = useState(true);
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    const preventResize = (e) => {
      e.preventDefault();
    };

    window.addEventListener("resize", preventResize);

    return () => {
      window.removeEventListener("resize", preventResize);
    };
  }, []);

  const handleChartReady = () => {
    setChartLoaded(true);
  };

  const handleInputChange = (e) => {
    setTicker(e.target.value.toUpperCase());
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#27224B",
      },
      secondary: {
        main: "#F2F1F9",
      },
      background: {
        default: darkMode ? "#1C1932" : "#fafafa",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { overflowX: "hidden" } }} />
      <RootContainer>
        <ContentContainer>
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
            sx={{
              width: "100%",
              paddingTop: theme.spacing(2),
              paddingBottom: theme.spacing(1), // Add paddingBottom to Stack
            }}
          >
            <Logo/>
            <SearchContainer>
              <TextField
                label="Enter stock ticker"
                value={ticker}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
              />
            </SearchContainer>
            {ticker ? (
              <Box
                sx={{
                  width: "100%",
                }}
                mt={3}
                position="relative"
              >
                {!chartLoaded && (
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
                    <CircularProgress />
                  </Box>
                )}
                <div className="chart-wrapper">
                  <TradingViewWidget
                    symbol={ticker}
                    width="100%"
                    height="400"
                    interval="H"
                    timezone="America/New_York"
                    theme={darkMode ? Themes.DARK : Themes.LIGHT}
                    style="1"
                    locale="en"
                    toolbar_bg={darkMode ? "#2c2d2e" : "#f1f3f6"}
                    hide_side_toolbar={true}
                    enable_publishing={false}
                    withdateranges={true}
                    allow_symbol_change={false}
                    studies={[
                      "BB@tv-basicstudies",
                      "MAExp@tv-basicstudies",
                      "RSI@tv-basicstudies",
                    ]}
                    container_id="tradingview-widget-container"
                    onWidgetReady={handleChartReady}
                  />
                </div>
              </Box>
            ) : (
              <Skeleton
                variant="rectangular"
                width="100%"
                animation="wave"
                height="400px"
                sx={{ mt: 3 }}
              />
              )}
          </Stack>
        </ContentContainer>
        <FooterContainer>
          <Footer>
            <Typography
              p={2}
              color={darkMode ? "#fafafa" : "#1C1932"}
              variant="body2"
            >
              Disclaimer: For educational purposes only. Always consult a
              financial professional before making any investment decisions.
              Data provided by{" "}
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
          </Footer>
          <Subfooter>
            <Typography
              p={1}
              variant="caption"
              color={darkMode ? "#fafafa" : "#1C1932"}
            >
              &copy; {new Date().getFullYear()} Trendly. All rights reserved.
            </Typography>
          </Subfooter>
        </FooterContainer>
        <StyledFab
          color={darkMode ? "primary" : "secondary"}
          aria-label="Toggle dark/light mode"
          onClick={handleThemeToggle}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </StyledFab>
      </RootContainer>
    </ThemeProvider>
  );
}

export default App;
