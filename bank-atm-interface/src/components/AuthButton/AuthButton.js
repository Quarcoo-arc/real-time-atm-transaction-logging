import React from "react";
import { Btn } from "./AuthButton.styled";
import { useRouter } from "next/navigation";

/**
 * type - register || login
 */
const AuthButton = ({ type }) => {
  const router = useRouter();
  const handleClick = () => router.push(`/${type}`);

  return (
    <Btn onClick={handleClick}>Sign {type === "register" ? "Up" : "In"}</Btn>
  );
};

export default AuthButton;
