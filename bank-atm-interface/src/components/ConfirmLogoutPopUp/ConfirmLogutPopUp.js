"use client";
import React from "react";
import DialogueBox from "../DialogueBox/DialogueBox";
import { FilledButton } from "../Buttons/Buttons";
import { useRouter } from "next/navigation";

const ConfirmLogutPopUp = ({ open, setOpen }) => {
  const router = useRouter();
  return (
    <DialogueBox
      open={open}
      setOpen={setOpen}
      heading="Confirm Exit"
      body="Are you sure you want to leave?"
      footer={
        <>
          <FilledButton onClick={() => setOpen(false)}>No</FilledButton>
          <FilledButton type="warning" onClick={() => router.push("/")}>
            Yes
          </FilledButton>
          {/**Todo: Change callback function */}
        </>
      }
    />
  );
};

export default ConfirmLogutPopUp;
