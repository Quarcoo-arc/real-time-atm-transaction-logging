"use client";
import React, { useEffect } from "react";
import SubPage from "../SubPage/SubPage";
import { MuiOtpInput } from "mui-one-time-password-input";
import { ContentWrapper } from "./PinEntryPage.styled";
import { useUser } from "@/app/UserContext";

/**
 *
 * Accept SubPage as input
 * Accept SubHeading as props
 * OnSubmit function for otp form
 * OTP form in the body
 * Set focus on OTP form on page load
 *
 */

const PinEntryPage = ({ heading, otp, setOtp, onComplete }) => {
  const { checkAuth } = useUser();
  useEffect(() => {
    checkAuth();
  }, []);
  const matchIsNumeric = (text) => {
    const isNumber = typeof text === "number";
    const isString = typeof text === "string";
    return (
      (isNumber || (isString && text !== "")) &&
      (!isNaN(Number(text)) || text === "")
    );
  };

  const validateChar = (value, index) => {
    return matchIsNumeric(value);
  };

  const checkDelete = (event) => {
    if (event.key === "Backspace") {
      otp && setOtp(otp.slice(0, -1));
    }
  };

  return (
    <SubPage subHeading={heading}>
      <ContentWrapper>
        <MuiOtpInput
          sx={{
            ".MuiOutlinedInput-root": {
              fontSize: "3rem",
            },
            ".MuiOutlinedInput-root, .MuiOutlinedInput-root:hover": {
              color: "white",
            },
            ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e1d4bb",
            },
            // fontSize: "1.2rem",
            fontFamily: "Poppins",
            ".MuiOutlinedInput-notchedOutline": {
              border: "none",
              borderBottom: "2px solid #FFFFF3",
            },
            ".MuiOutlinedInput-root:focus .MuiOutlinedInput-notchedOutline": {
              color: "white",
              borderColor: "#c2993a !important",
            },
          }}
          validateChar={validateChar}
          onKeyDown={checkDelete}
          onComplete={onComplete}
          value={otp}
          onChange={(newValue) => setOtp(newValue)}
        />
      </ContentWrapper>
    </SubPage>
  );
};

export default PinEntryPage;
