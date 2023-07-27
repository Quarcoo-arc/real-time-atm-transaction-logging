import React, { useState } from "react";
import { AlertToast, AuthButton, SideImage, UserIcon } from "@/components";
import { ContentWrapper, FlexWrapper } from "./AuthPage.styled";
import { useUser } from "@/app/UserContext";

const AuthPage = ({
  src,
  btnType,
  openSnackBar = false,
  setOpenSnackBar,
  alertMessage = "",
  children,
}) => {
  const { user } = useUser();
  return (
    <div>
      <AlertToast
        message={alertMessage}
        open={openSnackBar}
        setOpen={setOpenSnackBar}
      />
      {!(user && user.name) ? (
        <AuthButton type={btnType} />
      ) : (
        <UserIcon name={user.name} email={user.email} />
      )}
      <FlexWrapper>
        <ContentWrapper>{children}</ContentWrapper>
        <SideImage alt="Register" src={src} />
      </FlexWrapper>
    </div>
  );
};

export default AuthPage;
