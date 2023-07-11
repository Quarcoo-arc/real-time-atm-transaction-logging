"use client";
import { PinEntryPage } from "@/sharedPages";
import React, { useState } from "react";

const Auth = () => {
  const [otp, setOtp] = useState("");
  return (
    <PinEntryPage
      heading="Please enter your PIN to proceed"
      otp={otp}
      setOtp={setOtp}
      onComplete={(val) => alert(val)}
    />
  );
};

export default Auth;
