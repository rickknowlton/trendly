import React, { useState } from "react";
import { Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { PeekingBox, FooterContainer, SlideContainer } from "./styledComponents";
import Footer from "./Footer";
import Subfooter from "./Subfooter";

const SlideDrawer = ({ theme, darkMode }) => {
  const [boxOpen, setBoxOpen] = useState(false);

  const toggleBox = () => {
    setBoxOpen(!boxOpen);
  };

  return (
    <FooterContainer>
      <PeekingBox isOpen={boxOpen}>
        <Button style={{color: darkMode ? theme.palette.secondary.accent : theme.palette.secondary.text}} onClick={toggleBox}>
          {boxOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </Button>
        <SlideContainer>
          <Footer theme={theme} darkMode={darkMode} />
          <Subfooter theme={theme} darkMode={darkMode} />
        </SlideContainer>
      </PeekingBox>
    </FooterContainer>
  );
}

export default SlideDrawer;
