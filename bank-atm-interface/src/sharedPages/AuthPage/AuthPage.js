import React from "react";
import { AuthButton, SideImage } from "@/components";
import { ContentWrapper, FlexWrapper } from "./AuthPage.styled";

const AuthPage = ({ src, btnType, children }) => {
  return (
    <div>
      <AuthButton>{btnType}</AuthButton>
      <FlexWrapper>
        <ContentWrapper>{children}</ContentWrapper>
        <SideImage alt="Register" src={src} />
      </FlexWrapper>
    </div>
  );
};

export default AuthPage;
