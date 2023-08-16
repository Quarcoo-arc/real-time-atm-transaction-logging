"use client";
import UserContext, { useUser } from "@/app/UserContext";
import { DialogueBox } from "@/components";
import { FilledButton } from "@/components/Buttons/Buttons";
import { PinEntryPage } from "@/sharedPages";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Auth = () => {
  const [otp, setOtp] = useState("");
  const [openDialogue, setOpenDialogue] = useState(false);
  const { postDataHandler } = useContext(UserContext);
  const router = useRouter();

  const { redirectUrl, setPin, setRedirectUrl, setIsLoading } = useUser();
  useEffect(() => {
    setIsLoading(false);
    if (!redirectUrl) {
      setIsLoading(true);
      router.push("/atm");
    }
  }, []);

  const checkPIN = async (val) => {
    try {
      setIsLoading(true);
      const result = await postDataHandler(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/verify-pin`,
        {
          pin: val,
        }
      );
      if (result.success) {
        const redirectTo = redirectUrl;
        setPin(val);
        setRedirectUrl("");
        router.push(redirectTo);
      } else {
        setIsLoading(false);
        setOpenDialogue(true);
      }
    } catch (error) {
      setIsLoading(false);
      setOpenDialogue(true);
    }
  };
  return (
    <>
      <PinEntryPage
        heading="Please enter your PIN to proceed"
        otp={otp}
        setOtp={setOtp}
        onComplete={checkPIN}
      />
      <DialogueBox
        open={openDialogue}
        setOpen={setOpenDialogue}
        heading="Invalid PIN"
        body="Please try again. Or visit any of our branches to reset your PIN."
        footer={
          <>
            <FilledButton
              type="warning"
              onClick={() => {
                setIsLoading(true);
                router.back();
              }}
            >
              Cancel
            </FilledButton>
            <FilledButton onClick={() => setOpenDialogue(false)}>
              Retry
            </FilledButton>
          </>
        }
      />
    </>
  );
};

export default Auth;
