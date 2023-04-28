import { Container, Fab, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

// App.js
export const RootContainer = styled(Container)(({ theme }) => ({
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
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
}));

export const ContentContainer = styled(Container)(({ theme }) => ({
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

export const StyledFab = styled(Fab)(({ theme }) => ({
  height: "2.8rem",
  width: "2.8rem",
}));

// SlideDrawer.js
export const PeekingBox = styled(Box)(({ theme, isOpen }) => ({
  position: "absolute",
  bottom: isOpen ? 0 : "-165px",
  left: 0,
  right: 0,
  height: "200px",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[300]
      : theme.palette.grey[900],
  color: "#fff",
  borderRadius: "18px 18px 0 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "0.3s",
  boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1), 0 -1px 3px rgba(0, 0, 0, 0.08)",
}));

export const FooterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
}));

export const SlideContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[300]
      : theme.palette.grey[900],
  transition: "0.3s",
  maxWidth: "500px",
  minWidth: "500px",
  padding: "0 !important",
  position: "absolute",
  bottom: "0",
  zIndex: 1000,
}));

// Footer.js
export const FooterTypography = styled(Typography)(({ theme }) => ({
  borderTop: "1px solid rgba(0, 0, 0, 0.2)",
  borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
}));
