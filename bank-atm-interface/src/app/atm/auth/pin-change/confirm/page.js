"use client";
import React, { useEffect, useState } from "react";
import { PinEntryPage } from "@/sharedPages";
import { useUser } from "@/app/UserContext";
import { useRouter } from "next/navigation";

const ConfirmPIN = () => {
  const [otp, setOtp] = useState("");
  const [displayAlert, setDisplayAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const {
    newPin,
    postDataHandler,
    oldPin,
    setOldPin,
    setNewPin,
    setPin,
    pin,
    checkPINEntry,
  } = useUser();

  useEffect(() => {
    if (!newPin) {
      router.push("/atm/auth/pin-change");
    }
    return () => {
      setNewPin("");
    };
  }, []);

  useEffect(() => {
    setPin(oldPin);

    checkPINEntry();

    return () => {
      setOldPin("");
      setPin("");
    };
  }, []);

  const handlePinChange = async (val) => {
    if (newPin !== val) {
      setErrorMessage("PINs do not match");
      setDisplayAlert(true);
    } else {
      try {
        const result = await postDataHandler(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/change-pin`,
          {
            pin,
            newPIN: newPin,
          }
        );
        if (result.success) {
          router.push("/atm/auth/pin-change/success");
        } else {
          router.push("/atm/auth/pin-change/error");
        }
      } catch (error) {
        router.push("/atm/auth/pin-change/error");
      }
    }
  };

  return (
    <PinEntryPage
      heading="Enter new PIN again to confirm change"
      otp={otp}
      setOtp={setOtp}
      onComplete={handlePinChange}
      setOpenSnackBar={setDisplayAlert}
      alertMessage={errorMessage}
      openSnackBar={displayAlert}
    />
  );
};

export default ConfirmPIN;
