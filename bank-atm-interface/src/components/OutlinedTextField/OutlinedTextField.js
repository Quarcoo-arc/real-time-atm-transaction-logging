"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";

const OutlinedTextField = ({
  onChange,
  label,
  type,
  error,
  value,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return type === "password" || type === "confirm_password" ? (
    <FormControl
      fullWidth
      error={error}
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
          fontSize: value ? "1rem" : "1.5rem",
          left: value ? 0 : "0.6rem",
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
      variant="outlined"
    >
      <InputLabel htmlFor="standard-adornment-password">
        {type === "confirm_password" ? "Confirm Password" : "Password"}
      </InputLabel>
      <OutlinedInput
        id={type}
        type={showPassword ? "text" : "password"}
        onChange={onChange}
        label={label}
        name={type}
        value={value}
        error={error}
        helperText={helperText}
        aria-describedby={`${type}-text`}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText id={`${type}-text`}>{helperText}</FormHelperText>
    </FormControl>
  ) : (
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
          fontSize: value ? "1rem" : "1.5rem",
          left: value ? 0 : "0.6rem",
        },
        "input:-internal-autofill-selected": {
          background: "none !important",
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
      id={type}
      name={type}
      value={value}
      error={error}
      helperText={helperText}
      variant="outlined"
    />
  );
};

export default OutlinedTextField;
