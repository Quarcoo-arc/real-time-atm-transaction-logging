"use client";
import React from "react";
import { BackNavigationWrapper } from "./BackNavigation.styled";
import { ChevronLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const BackNavigation = () => {
  const router = useRouter();
  return (
    <BackNavigationWrapper onClick={() => router.back()}>
      <ChevronLeft sx={{ fontSize: "2rem" }} />
      <h3>Back</h3>
    </BackNavigationWrapper>
  );
};

export default BackNavigation;
