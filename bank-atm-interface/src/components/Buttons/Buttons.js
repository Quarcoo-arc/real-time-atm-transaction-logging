"use client";
import Button from "@mui/material/Button";

const FilledButton = ({ type, onClick, children }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        fontFamily: "Poppins",
        color: "white",
        backgroundColor: type === "warning" ? "#F50606" : "#537188",
        padding: "0.8rem 1rem",
        boxSizing: "border-box",
        width: "8rem",
        borderRadius: "0.625rem",
        textTransform: "uppercase",
        ":hover": {
          outline: `2px solid ${type === "warning" ? "#F50606" : "#537188"}`,
          outlineOffset: "2px",
          background: "none",
          color: type === "warning" ? "#F50606" : "#537188",
        },
      }}
      variant="contained"
    >
      {children}
    </Button>
  );
};

export { FilledButton };
