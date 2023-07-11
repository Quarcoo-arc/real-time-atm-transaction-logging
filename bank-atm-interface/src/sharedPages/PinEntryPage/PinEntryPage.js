"use client";
import React from "react";
import SubPage from "../SubPage/SubPage";

/**
 *
 * Accept SubPage as input
 * Accept SubHeading as props
 * OnSubmit function for otp form
 * OTP form in the body
 * Set focus on OTP form on page load
 *
 */

const PinEntryPage = ({ heading, children }) => {
  return <SubPage subHeading={heading}>{children}</SubPage>;
};

export default PinEntryPage;
