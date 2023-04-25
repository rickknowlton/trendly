import React, { useState } from "react";
import { Box, Button, Slide } from "@mui/material";
import Footer from "./Footer";
import Subfooter from "./Subfooter";
import { styled } from "@mui/system";

const FooterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
}));

const SlideContainer = styled(Box)(({ theme }) => ({
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

function SlideDrawer({ theme, darkMode }) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <FooterContainer>
      <Button type="button" onClick={toggleDrawer}>
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
          <SlideContainer>
            <Footer darkMode={darkMode} />
            <Subfooter darkMode={darkMode} />
            <Button type="button" onClick={toggleDrawer}>
              Close Drawer
            </Button>
          </SlideContainer>
        </Box>
      </Slide>
    </FooterContainer>
  );
}

export default SlideDrawer;
