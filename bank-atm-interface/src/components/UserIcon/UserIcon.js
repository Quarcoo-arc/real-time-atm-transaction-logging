"use client";
import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Email, LogoutWrapper, UserInfo, Wrapper } from "./UserIcon.styled";

const UserIcon = ({ name, email }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Wrapper>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <AccountCircleRoundedIcon
          sx={{
            fontSize: "4rem",
            color: "white",
            "@media screen and (max-width: 768px)": {
              fontSize: "3rem",
            },
            "@media screen and (max-width: 428px)": {
              fontSize: "2.5rem",
            },
          }}
        />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "0.6rem",
          },
        }}
      >
        <UserInfo>
          <AccountCircleRoundedIcon
            sx={{ fontSize: "3rem", color: "var(--blue)" }}
          />
          <div>
            <p>{name}</p>
            <Email>{email}</Email>
          </div>
        </UserInfo>
        <LogoutWrapper>
          <LogoutRoundedIcon sx={{ fontSize: "1.5rem" }} />
          Logout
        </LogoutWrapper>
      </Popover>
    </Wrapper>
  );
};

export default UserIcon;
