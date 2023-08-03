"use client";
import { AuthPage } from "@/sharedPages";
import React, { useEffect } from "react";
import registrationSuccess from "../../../../public/successful_registration_img.jpg";
import { ContentWrapper } from "@/components/Wrappers";
import { FormButton, Heading } from "@/components";
import { WrapAndLeft } from "./page.styled";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";

const SuccessfulRegistration = () => {
  const router = useRouter();
  const { checkAuth } = useUser();
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthPage src={registrationSuccess}>
      <ContentWrapper>
        <div>
          <Heading>Congrats!</Heading>
          <Heading type="sub">Account creation successful</Heading>
        </div>
        <WrapAndLeft>
          <p>Thanks for choosing us</p>
          <FormButton onClick={() => router.push("/atm")} type="button">
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
