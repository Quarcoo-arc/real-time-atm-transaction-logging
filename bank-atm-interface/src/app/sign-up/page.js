"use client";
import React, { useState } from "react";
import { AuthPage } from "@/sharedPages";
import registerImg from "../../../public/register_img.jpg";
import { OutlinedTextField } from "@/components";

const SignUp = () => {
  const [email, setEmail] = useState("");
  return (
    <AuthPage btnType="Sign Up" src={registerImg}>
      <h2>Hi There</h2>
      <OutlinedTextField
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
    </AuthPage>
  );
};

export default SignUp;
