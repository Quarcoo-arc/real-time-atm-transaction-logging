import React from "react";
import { Btn } from "./AuthButton.styled";

const AuthButton = ({ children }) => {
  return <Btn>{children}</Btn>;
};

export default AuthButton;
