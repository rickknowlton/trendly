import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = ({ ticker, handleInputChange }) => {
  return (
    <TextField
      label="Enter Stock Ticker"
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
  );
};

export default SearchContainer;
