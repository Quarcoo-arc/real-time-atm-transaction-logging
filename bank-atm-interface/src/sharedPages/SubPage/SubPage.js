import BackNavigation from "@/components/BackNavigation/BackNavigation";
import React, { useEffect, useState } from "react";
import { BodyWrapper, ButtonsWrapper, ContentWrapper } from "./SubPage.styled";
import {
  AlertToast,
  Background,
  ConfirmLogutPopUp,
  Heading,
} from "@/components";
import { FilledWithIconButton } from "@/components/Buttons/Buttons";
import { HomeRounded, LogoutRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";

/**
 *
 * Heading &/or Subheading
 * BackNavigation
 * BackgroundImage
 * children
 *
 */

const SubPage = ({
  heading,
  subHeading,
  buttons = false,
  openSnackBar = false,
  setOpenSnackBar,
  alertMessage = "",
  children,
}) => {
  const router = useRouter();
  const [openDialogue, setOpenDialogue] = useState(false);
  const { checkAuth } = useUser();
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <AlertToast
        message={alertMessage}
        open={openSnackBar}
        setOpen={setOpenSnackBar}
      />
      <BackNavigation />
      <ContentWrapper>
        <Background />
        {heading && <Heading alignment="center">{heading}</Heading>}
        <Heading alignment="center" type="sub">
          {subHeading}
        </Heading>
        <BodyWrapper>{children}</BodyWrapper>
        {buttons && (
          <ButtonsWrapper>
            <FilledWithIconButton onClick={() => router.push("/atm")}>
              <HomeRounded />
              <p>Home</p>
            </FilledWithIconButton>
            <FilledWithIconButton
              type="warning"
              onClick={() => setOpenDialogue(true)}
            >
              <LogoutRounded />
              <p>Logout</p>
            </FilledWithIconButton>
          </ButtonsWrapper>
        )}
      </ContentWrapper>
      <ConfirmLogutPopUp open={openDialogue} setOpen={setOpenDialogue} />
    </>
  );
};

export default SubPage;
