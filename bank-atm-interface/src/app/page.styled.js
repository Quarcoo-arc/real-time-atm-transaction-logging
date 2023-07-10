"use client";
import styled from "@emotion/styled";
import Image from "next/image";

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row;

  margin: 10% auto 3rem;
  gap: 2rem;
  width: 95%;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-top: 7rem;
    flex-flow: row wrap-reverse;
  }
  @media screen and (max-width: 425px) {
    gap: 3rem;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    text-align: center;
    justify-content: center;
    align-items: center;
  }
`;

const UpperCaseText = styled.h1`
  text-transform: uppercase;
  span {
    color: var(--gold);
  }
  @media screen and (max-width: 425px) {
    font-size: 1.5rem;
  }
`;

const StyledImage = styled(Image)`
  @media screen and (max-width: 768px) {
    height: 15rem;
  }
  @media screen and (max-width: 425px) {
    height: 10rem;
  }
`;

export {
  ContentWrapper,
  UpperCaseText,
  TextWrapper,
  ImageWrapper,
  StyledImage,
};
