"use client";
import React, { useEffect, useState } from "react";
import { PinEntryPage } from "@/sharedPages";
import { useUser } from "@/app/UserContext";
import { useRouter } from "next/navigation";

const PINChange = () => {
  const [otp, setOtp] = useState("");
  const { checkPINEntry, setPin, setNewPin, pin, setOldPin, setIsLoading } =
    useUser();
  const router = useRouter();

  useEffect(() => {
    checkPINEntry();
    setIsLoading(false);
    return () => {
      setPin("");
    };
  }, []);

  const handleComplete = (val) => {
    setIsLoading(true);
    setNewPin(val);
    setOldPin(pin);
    router.push("/atm/auth/pin-change/confirm");
  };

  return (
    <PinEntryPage
      heading="Please enter your new PIN"
      otp={otp}
      setOtp={setOtp}
      onComplete={handleComplete}
    />
  );
};

export default PINChange;
