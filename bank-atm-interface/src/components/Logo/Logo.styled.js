"use client";
import styled from "@emotion/styled";

const LogoText = styled.h1`
  font-family: var(--font-dancing-script);
  font-size: 75px;
  line-height: 96px;
  color: white;
  position: absolute;
  top: 1rem;
  left: 2rem;
  margin: 0;
  @media screen and (max-width: 768px) {
    font-size: 60px;
    line-height: 60px;
    left: 1rem;
  }
  @media screen and (max-width: 426px) {
    font-size: 40px;
  }
`;

export { LogoText };
