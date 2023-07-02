"use client";
import styled from "@emotion/styled";

const MainHeading = styled.h1`
  color: #fff;
  font-size: 4rem;
  font-style: normal;
  font-weight: 400;
  @media screen and (max-width: 428px) {
    font-size: 3rem;
  }
`;

const SubHeading = styled.h2`
  color: #e1d4bb;
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  @media screen and (max-width: 425px) {
    font-size: 2rem;
  }
`;

export { MainHeading, SubHeading };
