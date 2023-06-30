import React from "react";
import { AuthPage } from "@/sharedPages";
import registerImg from "../../../public/register_img.jpg";

const SignUp = () => {
  return (
    <AuthPage btnType="Sign Up" src={registerImg}>
      <h2>Hi There</h2>
    </AuthPage>
  );
};

export default SignUp;
