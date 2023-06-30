"use client";
import React from "react";
import TextField from "@mui/material/TextField";

const OutlinedTextField = ({ onChange, label }) => {
  return (
    <TextField
      fullWidth
      sx={{
        "& .MuiInputBase-input": {
          fontSize: "1.5rem",
          padding: "1rem 1.5rem",
        },
        input: {
          color: "white",
        },
        fieldset: {
          border: "2px solid #FFF",
          borderRadius: "1.25rem",
        },
        label: {
          color: "#CCC",
          fontSize: "1.5rem",
          left: "0.6rem",
        },
        "& label.Mui-focused": {
          color: "#e1d4bb",
          left: 0,
          fontSize: "1rem",
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "#c2993a",
          },
          "&:hover fieldset": {
            borderColor: "#e1d4bb",
          },
        },
      }}
      onChange={onChange}
      label={label}
      variant="outlined"
    />
  );
};

export default OutlinedTextField;
