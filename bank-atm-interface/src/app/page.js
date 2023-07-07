"use client";
import { AuthButton } from "@/components";
import {
  ContentWrapper,
  ImageWrapper,
  StyledImage,
  TextWrapper,
  UpperCaseText,
} from "./page.styled";
import { Button } from "@mui/material";
import susuBox from "../../public/susu_box.svg";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <AuthButton onClick={() => router.push("/login")}>Sign In</AuthButton>
      <ContentWrapper>
        <TextWrapper>
          <UpperCaseText>
            Fast, reliable & affordable <span>banking</span> you can trust
          </UpperCaseText>
          <Button
            onClick={() => router.push("/register")}
            sx={{
              width: "fit-content",
              borderRadius: "1rem",
              background: "#FFF",
              color: "#000",
              fontWeight: 600,
              fontSize: "1.8rem",
              padding: "0.4rem 1rem",
              fontFamily: "Poppins",
              textTransform: "capitalize",
              "&:hover": {
                border: "none",
                background: "none",
                color: "white",
                outline: "2px solid white",
                outlineOffset: "1px",
                boxSizing: "border-box",
              },
              "@media screen and (max-width: 425px)": {
                fontSize: "1.3rem",
                padding: "0.4rem 0.8rem",
              },
            }}
            variant="contained"
          >
            Get Started
          </Button>
        </TextWrapper>
        <ImageWrapper>
          <StyledImage src={susuBox} alt="" />
        </ImageWrapper>
      </ContentWrapper>
    </main>
  );
}
