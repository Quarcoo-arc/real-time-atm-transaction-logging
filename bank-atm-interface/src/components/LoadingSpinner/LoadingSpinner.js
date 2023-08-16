import React from "react";
import Backdrop from "@mui/material/Backdrop";
import ClipLoader from "react-spinners/ScaleLoader";

const LoadingSpinner = ({ open }) => {
  return (
    <Backdrop sx={{ color: "#E1D4BB", zIndex: 1500 }} open={open}>
      <ClipLoader
        color="#E1D4BB"
        loading={open}
        cssOverride={{}}
        size={300}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Backdrop>
  );
};

export default LoadingSpinner;
