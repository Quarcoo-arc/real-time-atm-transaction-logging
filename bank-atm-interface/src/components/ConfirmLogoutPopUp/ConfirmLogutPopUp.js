"use client";
import React from "react";
import DialogueBox from "../DialogueBox/DialogueBox";
import { FilledButton } from "../Buttons/Buttons";
import { useUser } from "@/app/UserContext";

const ConfirmLogutPopUp = ({ open, setOpen }) => {
  const { logoutHandler } = useUser();
  return (
    <DialogueBox
      open={open}
      setOpen={setOpen}
      heading="Confirm Exit"
      body="Are you sure you want to leave?"
      footer={
        <>
          <FilledButton onClick={() => setOpen(false)}>No</FilledButton>
          <FilledButton type="warning" onClick={logoutHandler}>
            Yes
          </FilledButton>
        </>
      }
    />
  );
};

export default ConfirmLogutPopUp;
