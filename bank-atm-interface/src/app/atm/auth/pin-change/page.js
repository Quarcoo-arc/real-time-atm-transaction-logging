"use client";
import React, { useState } from "react";
import { PinEntryPage } from "@/sharedPages";

const PINChange = () => {
  const [otp, setOtp] = useState("");
  return (
    <PinEntryPage
      heading="Please enter your new PIN"
      otp={otp}
      setOtp={setOtp}
      onComplete={(val) => alert(val)}
    />
  );
};

export default PINChange;
