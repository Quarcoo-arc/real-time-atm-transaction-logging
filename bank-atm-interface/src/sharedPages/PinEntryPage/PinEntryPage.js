"use client";
import React from "react";
import SubPage from "../SubPage/SubPage";
import { MuiOtpInput } from "mui-one-time-password-input";
import { ContentWrapper } from "./PinEntryPage.styled";

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
  const matchIsNumeric = (text) => {
    const isNumber = typeof text === "number";
    const isString = typeof text === "string";
    return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
  };

  const validateChar = (value, index) => {
    return matchIsNumeric(value);
  };
  return (
    <SubPage subHeading={heading}>
      <ContentWrapper>
        <MuiOtpInput
          sx={{
            ".MuiOutlinedInput-root, .MuiOutlinedInput-root:hover": {
              color: "white",
            },
            ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e1d4bb",
            },
            fontSize: "1.2rem",
            fontFamily: "Poppins",
            ".MuiOutlinedInput-notchedOutline": {
              border: "none",
              borderBottom: "2px solid #FFFFF3",
            },
            ".MuiOutlinedInput-root:focus .MuiOutlinedInput-notchedOutline": {
              color: "white",
              borderBottom: "2px solid #c2993a",
            },
          }}
          validateChar={validateChar}
          onComplete={onComplete}
          value={otp}
          onChange={(newValue) => setOtp(newValue)}
        />
      </ContentWrapper>
    </SubPage>
  );
};

export default PinEntryPage;
