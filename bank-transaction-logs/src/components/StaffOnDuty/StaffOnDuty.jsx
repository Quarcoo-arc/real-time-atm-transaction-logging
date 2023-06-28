import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/CloseRounded";
import SyncIcon from "@mui/icons-material/SyncRounded";
import TextField from "@mui/material/TextField";
import {
  Heading,
  StaffBtnWrapper,
  StaffEmail,
  StaffInfoWrapper,
  StaffName,
} from "./StaffOnDuty.styled";
import { useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: "2rem 0 1rem", textAlign: "center", fontWeight: 700 }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "black",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const StaffOnDuty = () => {
  const [open, setOpen] = React.useState(false);
  const [staffName, setStaffName] = useState("Michael Quarcoo");
  const [staffEmail, setStaffEmail] = useState("michaelquarcoo04@gmail.com");
  const [nameInputField, setNameInputField] = useState(staffName);
  const [emailInputField, setEmailInputField] = useState(staffEmail);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // TODO: Make API call to backend updating the staff on duty
    setStaffEmail(emailInputField);
    setStaffName(nameInputField);
    handleClose();
  };

  return (
    <div>
      <Heading>Staff On Duty</Heading>
      <Button
        style={{ backgroundColor: "white", borderRadius: 15 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        <StaffBtnWrapper>
          <StaffInfoWrapper>
            <StaffName>{staffName}</StaffName>
            <StaffEmail>{staffEmail}</StaffEmail>
          </StaffInfoWrapper>

          <SyncIcon
            sx={{
              padding: "0 1rem 0 0.8rem",
              maxWidth: "95%",
              "@media screen and (max-width: 425px)": {
                padding: "0 0.2rem 0 0.8rem",
              },
            }}
          />
        </StaffBtnWrapper>
      </Button>
      <BootstrapDialog
        sx={{
          ".MuiTypography-root, .MuiButton-text": {
            fontFamily: "Poppins",
          },
        }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Staff On Duty
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Stack
            component="form"
            sx={{
              width: "20rem",
              maxWidth: "100%",
            }}
            spacing={2}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={(e) => setNameInputField(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmailInputField(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack sx={{ margin: "0 auto" }} spacing={3} direction="row">
            <Button
              sx={{
                background: "#F50606",
                "&:hover": {
                  background: "none",
                  color: "#F50606",
                  outline: "1px solid #F50606",
                  outlineOffset: "1px",
                  boxSizing: "border-box",
                },
              }}
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              sx={{
                background: "#537188",
                "&:hover": {
                  background: "none",
                  color: "#537188",
                  outline: "1px solid #537188",
                  outlineOffset: "1px",
                  boxSizing: "border-box",
                },
              }}
              autoFocus
              variant="contained"
              onClick={handleSave}
            >
              Save
            </Button>
          </Stack>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default StaffOnDuty;
