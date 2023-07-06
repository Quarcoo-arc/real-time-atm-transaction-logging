import React from "react";
import { AuthButton, SideImage, UserIcon } from "@/components";
import { ContentWrapper, FlexWrapper } from "./AuthPage.styled";

const AuthPage = ({ src, btnType, children }) => {
  return (
    <div>
      {btnType ? (
        <AuthButton>{btnType}</AuthButton>
      ) : (
        <UserIcon name="Michael Quarcoo" email="michaelquarcoo04@gmail.com" />
      )}
      <FlexWrapper>
        <ContentWrapper>{children}</ContentWrapper>
        <SideImage alt="Register" src={src} />
      </FlexWrapper>
    </div>
  );
};

export default AuthPage;
