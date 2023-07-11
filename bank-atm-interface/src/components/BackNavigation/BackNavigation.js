"use client";
import React from "react";
import { BackNavigationWrapper } from "./BackNavigation.styled";
import { ChevronLeft } from "@mui/icons-material";

const BackNavigation = () => {
  return (
    <BackNavigationWrapper>
      <ChevronLeft sx={{ fontSize: "1.2rem" }} />
      <h3>Back</h3>
    </BackNavigationWrapper>
  );
};

export default BackNavigation;
