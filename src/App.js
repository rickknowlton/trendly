/* eslint-disable react/style-prop-object */
import React, { useState, useMemo, useCallback } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import ReactGA from "react-ga";
import { Box, Skeleton, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/system";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {
  RootContainer,
  ContentContainer,
  StyledFab,
} from "./components/styledComponents";
import Logo from "./components/Logo";
import SearchContainer from "./components/SearchContainer";
import LoadingIndicator from "./components/LoadingIndicator";
import SlideDrawer from "./components/SlideDrawer";
import useGoogleAnalytics from "./hooks/useGoogleAnalytics";
import usePreventWindowResize from "./hooks/usePreventWindowResize";
import useTickerFromStorage from "./hooks/useTickerFromStorage";
import createAppTheme from "./theme";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [chartLoaded, setChartLoaded] = useState(false);
  const { ticker, setTicker, loading: tickerLoading } = useTickerFromStorage();
  useGoogleAnalytics();
  usePreventWindowResize();

  const handleChartReady = useCallback(() => {
    setChartLoaded(true);
    ReactGA.event({
      category: "Chart",
      action: "Chart loaded",
      label: `Chart for ${ticker}`,
    });
  }, [ticker]);

  const handleInputChange = useCallback(
    (e) => {
      setTicker(e.target.value.toUpperCase());
      ReactGA.event({
        category: "User Interaction",
        action: "Changed ticker",
        label: `Changed to ${e.target.value.toUpperCase()}`,
      });
    },
    [setTicker]
  );

  const handleThemeToggle = useCallback(() => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    ReactGA.event({
      category: "User Interaction",
      action: "Theme toggled",
      label: darkMode ? "Light Mode" : "Dark Mode",
    });
  }, [darkMode]);

  const theme = useMemo(() => {
    return createAppTheme(darkMode);
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
            />
            {tickerLoading || !ticker ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                animation="wave"
                height="360px"
                sx={{ mt: 3 }}
              />
            ) : (
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
            )}
          </Stack>
        </ContentContainer>
        <SlideDrawer theme={theme} darkMode={darkMode} />
      </RootContainer>
    </ThemeProvider>
  );
}

export default App;
