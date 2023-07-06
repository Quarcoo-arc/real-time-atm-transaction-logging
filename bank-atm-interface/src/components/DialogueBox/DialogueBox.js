"use client";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

/** open, setOpen - useState for opening and closing dialogue box */
const DialogueBox = ({ open, setOpen, heading, body, footer }) => {
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
        {heading}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ fontWeight: 500 }}>{body}</DialogContent>
      <DialogActions sx={{ paddingBottom: "1.5rem" }}>{footer}</DialogActions>
    </Dialog>
  );
};

export default DialogueBox;
