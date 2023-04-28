import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = ({ theme, ticker, handleInputChange }) => {
  return (
    <TextField
      sx={(theme) => ({
        "& .MuiOutlinedInput-root.Mui-focused": {
          "& > fieldset": { border: theme.palette.mode === 'dark' ? "1px solid #fff" : undefined },
        },
        "& .MuiInputLabel-root.Mui-focused": { color: theme.palette.mode === 'dark' ? "#fff" : undefined }
      })}
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
