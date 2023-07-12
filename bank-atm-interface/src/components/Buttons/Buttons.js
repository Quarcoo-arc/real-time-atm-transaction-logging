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

const FilledWithIconButton = ({ type, onClick, children }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        fontFamily: "Poppins",
        display: "flex",
        gap: "0.4rem",
        justifyContent: "center",
        alignItems: "center",
        color: type === "warning" ? "white" : "black",
        backgroundColor: type === "warning" ? "#F50606" : "white",
        padding: "0.8rem 1rem",
        boxSizing: "border-box",
        width: "15rem",
        borderRadius: "0.625rem",
        textTransform: "capitalize",
        ":hover": {
          outline: `2px solid ${type === "warning" ? "#F50606" : "white"}`,
          outlineOffset: "2px",
          background: "none",
          color: type === "warning" ? "#F50606" : "white",
        },
      }}
      variant="contained"
    >
      {children}
    </Button>
  );
};

export { FilledButton, FilledWithIconButton };
