/* eslint-disable react/style-prop-object */
import React, { useState, useEffect, useMemo } from "react";
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
import { Typography, Link, Button, Skeleton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import InputAdornment from "@mui/material/InputAdornment";
// import { ReactComponent as Logo } from "./assets/images/trendly-txt-fade.svg";
import { GlobalStyles } from "@mui/system";
import Logo from "./components/Logo";
import SearchContainer from "./components/SearchContainer";
import Footer from "./components/Footer";
import Subfooter from "./components/Subfooter";
import LoadingIndicator from "./components/LoadingIndicator";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import SlideDrawer from "./components/SlideDrawer";

const RootContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "0 !important",
  backgroundColor: theme.palette.background.default,
  maxWidth: "500px",
  minWidth: "500px",
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
  maxWidth: "500px",
  minWidth: "500px",
  margin: "0 auto",
  marginX: "0px !important",
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
  position: "absolute", // Make FooterContainer fixed
  bottom: "0", // Set bottom property
  zIndex: 1000, // Ensure the footer is above other content
  boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1), 0 -1px 3px rgba(0, 0, 0, 0.08)", // Add a box-shadow on top edge
}));

// const SearchContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   width: "100%",
// }));

const StyledFab = styled(Fab)(({ theme }) => ({
  height: "2.8rem",
  width: "2.8rem",
}));

// const Footer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   width: "100%",
//   backgroundColor: theme.palette.background.paper,
//   borderTop: `1px solid ${theme.palette.divider}`,
//   marginTop: "auto",
// }));

// const Subfooter = styled(Box)(({ theme }) => ({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   width: "100%",
//   fontSize: "0.8rem",
//   backgroundColor: theme.palette.background.paper,
//   borderTop: `1px solid ${theme.palette.divider}`,
// }));

function App() {
  const [ticker, setTicker] = useState("SPY");
  const [darkMode, setDarkMode] = useState(true);
  const [chartLoaded, setChartLoaded] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const preventResize = (e) => {
      e.preventDefault();
    };

    window.addEventListener("resize", preventResize);

    return () => {
      window.removeEventListener("resize", preventResize);
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleChartReady = () => {
    setChartLoaded(true);
  };

  const handleInputChange = (e) => {
    setTicker(e.target.value.toUpperCase());
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const theme = useMemo(() => {
    return createTheme({
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
              paddingBottom: theme.spacing(1), // Add paddingBottom to Stack
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
        {/* <Button type="button" onClick={toggleDrawer}>
          Toggle Drawer
        </Button>
        <Slide in={drawerVisible} direction="up">
          <Box
            sx={{
              position: "relative",
              maxWidth: "500px",
              minWidth: "500px",
              backgroundColor: theme.palette.background.default,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <FooterContainer>
              <Footer darkMode={darkMode} />
              <Subfooter darkMode={darkMode} />
              <Button type="button" onClick={toggleDrawer}>
                Close Drawer
              </Button>
            </FooterContainer> */}
          {/* </Box>
        </Slide> */}
            <SlideDrawer darkMode={darkMode} theme={theme} />
      </RootContainer>
    </ThemeProvider>
  );
}

export default App;
