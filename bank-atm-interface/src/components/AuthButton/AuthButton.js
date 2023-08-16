import React from "react";
import { Btn } from "./AuthButton.styled";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";

/**
 * type - register || login
 */
const AuthButton = ({ type }) => {
  const router = useRouter();
  const { setIsLoading } = useUser();
  const handleClick = () => {
    setIsLoading(true);
    router.push(`/${type}`);
  };

  return (
    <Btn onClick={handleClick}>Sign {type === "register" ? "Up" : "In"}</Btn>
  );
};

export default AuthButton;
