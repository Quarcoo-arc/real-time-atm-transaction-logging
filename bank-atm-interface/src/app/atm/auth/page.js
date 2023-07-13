"use client";
import { DialogueBox } from "@/components";
import { FilledButton } from "@/components/Buttons/Buttons";
import { PinEntryPage } from "@/sharedPages";
import React, { useState } from "react";

const Auth = () => {
  const [otp, setOtp] = useState("");
  const [openDialogue, setOpenDialogue] = useState(false);

  //TODO: Make API calls
  const comparePIN = (val) => {
    val === "1234" ? alert("correct PIN") : setOpenDialogue(true);
  };
  return (
    <>
      <PinEntryPage
        heading="Please enter your PIN to proceed"
        otp={otp}
        setOtp={setOtp}
        onComplete={comparePIN}
      />
      <DialogueBox
        open={openDialogue}
        setOpen={setOpenDialogue}
        heading="Invalid PIN"
        body="Please try again. Or visit any of 
our branches to reset your PIN."
        footer={
          <>
            <FilledButton type="warning" onClick={() => setOpenDialogue(false)}>
              {/**Todo: Redirect to initial page on click */}
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
