"use client";
import { AuthPage } from "@/sharedPages";
import React from "react";
import registrationSuccess from "../../../../public/successful_registration_img.jpg";
import { ContentWrapper } from "@/components/Wrappers";
import { FormButton, Heading } from "@/components";
import { WrapAndLeft } from "./page.styled";
import { useRouter } from "next/navigation";

const SuccessfulRegistration = () => {
  const router = useRouter();
  return (
    <AuthPage src={registrationSuccess}>
      <ContentWrapper>
        <div>
          <Heading>Congrats!</Heading>
          <Heading type="sub">Account creation successful</Heading>
        </div>
        <WrapAndLeft>
          <p>Thanks for choosing us</p>
          <FormButton onClick={() => router.push("/dashboard")} type="button">
            Visit ATM
          </FormButton>
          <span>
            <p>Head over to out ATM to start making transactions</p>
          </span>
        </WrapAndLeft>
      </ContentWrapper>
    </AuthPage>
  );
};

export default SuccessfulRegistration;
