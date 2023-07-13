"use client";
import React from "react";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const AmountEntryTextField = ({ onChange, value }) => {
  const validateAmount = (e) => {
    const amount = e.target.value;
    const regex = /^([1-9][0-9]*(\.[0-9]{0,2})?$)|^(0?(\.[0-9]{0,2})?)$/;
    return !amount || regex.test(amount.toString());
  };
  return (
    <FormControl
      fullWidth
      variant="standard"
      sx={{
        m: 1,
        mt: 3,
        "& .MuiInputBase-input, .MuiTypography-root": {
          fontSize: "3rem",
          color: "white",
        },
        ".MuiInput-root:before": {
          borderColor: "rgba(255,255,255,0.6)",
        },
        ".MuiInput-root:after": {
          borderColor: "white",
        },
        "@media screen and (max-width: 428px)": {
          "& .MuiInputBase-input, .MuiTypography-root": {
            fontSize: "2.5rem",
          },
        },
      }}
    >
      <Input
        id="standard-adornment-amount"
        startAdornment={<InputAdornment position="start">GH₵</InputAdornment>}
        aria-describedby="standard-amount-helper-text"
        inputProps={{
          "aria-label": "amount",
        }}
        value={value}
        onChange={(e) => validateAmount(e) && onChange(e)}
      />
      {/* <FormHelperText id="standard-amount-helper-text">amount</FormHelperText> */}
    </FormControl>
  );
};

export default AmountEntryTextField;
