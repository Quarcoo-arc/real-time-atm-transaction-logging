"use client";
import styled from "@emotion/styled";

const LogoText = styled.a`
  font-family: var(--font-dancing-script);
  font-size: 4rem;
  color: white;
  position: absolute;
  top: 1rem;
  left: 2rem;
  margin: 0;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 3rem;
    left: 1rem;
  }
  @media screen and (max-width: 426px) {
    font-size: 40px;
  }
`;

export { LogoText };
