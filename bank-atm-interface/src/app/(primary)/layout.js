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
import { useIdleTimer } from "react-idle-timer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ConfirmationDialog = ({
  open,
  setOpen,
  extendSession,
  remainingTime,
}) => {
  const { logoutHandler } = useUser();
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
        You will be logged out in {remainingTime} second
        {remainingTime > 1 ? "s" : ""}
      </DialogContent>
      <DialogActions sx={{ paddingBottom: "1.5rem" }}>
        <>
          <FilledButton
            onClick={() => {
              extendSession();
              handleClose();
            }}
          >
            Stay
          </FilledButton>
          <FilledButton
            type="warning"
            onClick={() => {
              logoutHandler();
              handleClose();
            }}
          >
            Exit
          </FilledButton>
        </>
      </DialogActions>
    </Dialog>
  );
};

const PrimaryLayout = ({ children }) => {
  const timeout = 1000 * 60 * 3;
  const [remainingTime, setRemainingTime] = useState(timeout);
  const [openTimeoutDialogue, setOpenTimeoutDialogue] = useState(false);
  const [timeTillPrompt, setTimeTillPrompt] = useState(0);
  const { logoutHandler, authToken } = useUser();
  const promptBeforeIdle = 1000 * 30;

  useEffect(() => {
    setTimeTillPrompt(Math.max(remainingTime - promptBeforeIdle / 1000, 0));
  }, [remainingTime, promptBeforeIdle]);

  const onActive = () => {
    setOpenTimeoutDialogue(false);
  };

  const onPrompt = () => {
    setOpenTimeoutDialogue(true);
  };

  const onIdle = () => {
    setOpenTimeoutDialogue(false);
    logoutHandler();
  };

  const { getRemainingTime, activate } = useIdleTimer({
    disabled: !authToken,
    timeout,
    promptBeforeIdle,
    onActive,
    onPrompt,
    onIdle,
  });

  const extendSession = () => activate();

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <section>
      <ConfirmationDialog
        open={openTimeoutDialogue}
        setOpen={setOpenTimeoutDialogue}
        extendSession={extendSession}
        remainingTime={remainingTime}
      />
      {children}
    </section>
  );
};

export default PrimaryLayout;
