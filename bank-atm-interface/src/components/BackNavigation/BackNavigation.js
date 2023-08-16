"use client";
import React from "react";
import { BackNavigationWrapper } from "./BackNavigation.styled";
import { ChevronLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";

const BackNavigation = () => {
  const router = useRouter();
  const { setIsLoading } = useUser();
  return (
    <BackNavigationWrapper
      onClick={() => {
        setIsLoading(true);
        router.back();
      }}
    >
      <ChevronLeft sx={{ fontSize: "2rem" }} />
      <h3>Back</h3>
    </BackNavigationWrapper>
  );
};

export default BackNavigation;
