import React from "react";
import { Btn } from "./AuthButton.styled";

const AuthButton = ({ onClick, children }) => {
  return <Btn onClick={onClick}>{children}</Btn>;
};

export default AuthButton;
