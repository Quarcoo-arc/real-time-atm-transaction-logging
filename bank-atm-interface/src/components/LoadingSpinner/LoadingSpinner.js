import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = ({ open }) => {
  return (
    <Backdrop sx={{ color: "#E1D4BB", zIndex: 1500 }} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingSpinner;
