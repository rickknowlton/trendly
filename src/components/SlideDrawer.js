import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled } from "@mui/system";
import Footer from "./Footer";
import Subfooter from "./Subfooter";

const PeekingBox = styled(Box)(({ theme, isOpen }) => ({
  position: "absolute",
  bottom: isOpen ? 0 : "-165px", // Peek 50px when closed
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
  boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1), 0 -1px 3px rgba(0, 0, 0, 0.08)", // Add a box-shadow on top edge
}));

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
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[300]
      : theme.palette.grey[900],
  transition: "0.3s",
  maxWidth: "500px",
  minWidth: "500px",
  padding: "0 !important", // Added padding to ensure the footer does not overlap content
  position: "absolute", // Make FooterContainer fixed
  bottom: "0", // Set bottom property
  zIndex: 1000, // Ensure the footer is above other content
}));

function SlideDrawer({ theme, darkMode }) {
  const [boxOpen, setBoxOpen] = useState(false);

  const toggleBox = () => {
    setBoxOpen(!boxOpen);
  };

  return (
    <FooterContainer>
      <PeekingBox isOpen={boxOpen}>
        <Button color={darkMode ? "secondary" : "primary"} onClick={toggleBox}>
          {boxOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </Button>
        <SlideContainer>
          <Footer darkMode={darkMode} />
          <Subfooter darkMode={darkMode} />
        </SlideContainer>
      </PeekingBox>
    </FooterContainer>
  );
}

export default SlideDrawer;
