"use client";
import React from "react";
import Button from "@mui/material/Button";

const FormButton = ({ type, onClick, children }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      sx={{
        borderRadius: "1.25rem",
        background: "#FFF",
        color: "#000",
        fontWeight: 600,
        fontSize: "1.8rem",
        padding: "0.4rem 1rem",
        fontFamily: "Poppins",
        textTransform: "capitalize",
        "&:hover": {
          border: "none",
          background: "none",
          color: "white",
          outline: "2px solid white",
          outlineOffset: "1px",
          boxSizing: "border-box",
        },
      }}
      variant="contained"
    >
      {children}
    </Button>
  );
};

export default FormButton;
