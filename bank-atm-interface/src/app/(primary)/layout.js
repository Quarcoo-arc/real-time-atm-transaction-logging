"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { FilledButton } from "@/components/Buttons/Buttons";
import { useUser } from "../UserContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ConfirmationDialog = ({ open, setOpen }) => {
  const { extendSession, logoutHandler, timeTillPrompt } = useUser();
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted={true}
      onClose={handleClose}
      aria-describedby="dialog-box-description"
      sx={{
        ".MuiPaper-root": {
          borderRadius: "0.6rem",
          padding: "0 1rem",
        },
        "& .MuiDialogContent-root, & .MuiDialogActions-root, & .MuiDialogTitle-root":
          {
            fontFamily: "Poppins",
            justifyContent: "center",
            textAlign: "center",
          },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          paddingTop: "2rem",
        }}
      >
        Are you still there?
      </DialogTitle>
      <DialogContent>
        You will be logged out in {timeTillPrompt} second
        {timeTillPrompt > 1 ? "s" : ""}
      </DialogContent>
      <DialogActions sx={{ paddingBottom: "1.5rem" }}>
        <>
          <FilledButton onClick={extendSession}>Stay</FilledButton>
          <FilledButton type="warning" onClick={logoutHandler} />
        </>
      </DialogActions>
    </Dialog>
  );
};

const PrimaryLayout = ({ children }) => {
  const { extendSession, timeTillPrompt } = useUser();
  const [openDialogue, setOpenDialogue] = useState(false);

  useEffect(() => {
    if (timeTillPrompt > 0) {
      setOpenDialogue(true);
    }
  }, []);

  const handleClose = (bool) => {
    if (bool === false) {
      extendSession();
      setOpenDialogue(false);
    }
  };
  return (
    <section>
      <ConfirmationDialog open={openDialogue} setOpen={handleClose} />
      {children}
    </section>
  );
};

export default PrimaryLayout;
