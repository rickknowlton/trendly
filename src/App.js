/* eslint-disable react/style-prop-object */
/*global chrome*/
import React, { useState, useEffect, useMemo } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import ReactGA from 'react-ga';
import { Container, Box, Fab, Skeleton, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  red,
  blue,
  green,
  yellow,
  white,
  black,
  grey,
} from "@mui/material/colors";
import { GlobalStyles, styled } from "@mui/system";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Logo from "./components/Logo";
import SearchContainer from "./components/SearchContainer";
import LoadingIndicator from "./components/LoadingIndicator";
import SlideDrawer from "./components/SlideDrawer";

ReactGA.initialize(process.env.REACT_APP_GA_ID);

const RootContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "0 !important",
  backgroundColor: theme.palette.background.default,
  maxWidth: "500px !important",
  minWidth: "500px !important",
  overflow: "hidden !important",
  margin: "0 auto !important",
  position: "relative",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)", // Added boxShadow property
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingBottom: theme.spacing(8),
  backgroundColor: theme.palette.background.default,
  maxWidth: "500px !important",
  minWidth: "500px !important",
  margin: "0 auto",
  marginX: "0px !important",
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  height: "2.8rem",
  width: "2.8rem",
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

  useEffect(() => {
    const messageListener = (request, sender, sendResponse) => {
      if (request.action === "updateTicker") {
        console.log(`Received message from content script: ${request.ticker}`);
        setTicker(request.ticker);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  useEffect(() => {
    chrome.storage.local.get("selectedTicker", (data) => {
      if (data.selectedTicker) {
        console.log(`Retrieved ticker: ${data.selectedTicker}`);
        setTicker(data.selectedTicker);
      }
    });
  }, []);

  const handleChartReady = () => {
    setChartLoaded(true);
    ReactGA.event({
      category: 'Chart',
      action: 'Chart loaded',
      label: `Chart for ${ticker}`
    });
  };

  const handleInputChange = (e) => {
    setTicker(e.target.value.toUpperCase());
    ReactGA.event({
      category: 'User Interaction',
      action: 'Changed ticker',
      label: `Changed to ${e.target.value.toUpperCase()}`
    });
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    ReactGA.event({
      category: 'User Interaction',
      action: 'Theme toggled',
      label: darkMode ? 'Light Mode' : 'Dark Mode'
    });
  };

  const theme = useMemo(() => {
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
        fuck: {
          this: red[500],
        },
      },
    });
  }, [darkMode]);

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
              paddingBottom: theme.spacing(1),
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box width="82.5%">
                <Logo />
              </Box>
              <Box flexGrow={1} textAlign="right">
                <StyledFab
                  color={darkMode ? "primary" : "secondary"}
                  aria-label="Toggle dark/light mode"
                  onClick={handleThemeToggle}
                >
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </StyledFab>
              </Box>
            </Box>
            <SearchContainer
              ticker={ticker}
              handleInputChange={handleInputChange}
            />{" "}
            {ticker ? (
              <Box
                sx={{
                  width: "100%",
                }}
                mt={3}
                position="relative"
              >
                {!chartLoaded && <LoadingIndicator />}
                <div className="chart-wrapper">
                  <TradingViewWidget
                    symbol={ticker}
                    width="100%"
                    height="360"
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
        <SlideDrawer theme={theme} darkMode={darkMode} />
      </RootContainer>
    </ThemeProvider>
  );
}

export default App;
