import BackNavigation from "@/components/BackNavigation/BackNavigation";
import React, { useState } from "react";
import { BodyWrapper, ButtonsWrapper, ContentWrapper } from "./SubPage.styled";
import { Background, ConfirmLogutPopUp, Heading } from "@/components";
import { FilledWithIconButton } from "@/components/Buttons/Buttons";
import { HomeRounded, LogoutRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

/**
 *
 * Heading &/or Subheading
 * BackNavigation
 * BackgroundImage
 * children
 *
 */

const SubPage = ({ heading, subHeading, buttons = false, children }) => {
  const router = useRouter();
  const [openDialogue, setOpenDialogue] = useState(false);
  return (
    <>
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
            <FilledWithIconButton onClick={() => setOpenDialogue(true)}>
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
