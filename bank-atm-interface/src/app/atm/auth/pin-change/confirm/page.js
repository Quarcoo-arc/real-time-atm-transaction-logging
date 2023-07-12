"use client";
import React, { useState } from "react";
import { PinEntryPage } from "@/sharedPages";

const ConfirmPIN = () => {
  const [otp, setOtp] = useState("");
  return (
    <PinEntryPage
      heading="Enter new PIN again to confirm change"
      otp={otp}
      setOtp={setOtp}
      onComplete={(val) => alert(val)}
    />
  );
};

export default ConfirmPIN;
