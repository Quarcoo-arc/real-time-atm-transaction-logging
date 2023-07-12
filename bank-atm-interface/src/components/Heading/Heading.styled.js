"use client";
import styled from "@emotion/styled";

const MainHeading = styled.h1`
  color: #fff;
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 400;
  ${(props) => (props.alignment === "center" ? { textAlign: "center" } : {})}
  @media screen and (max-width: 428px) {
    font-size: 2.5rem;
  }
`;

const SubHeading = styled.h2`
  color: #e1d4bb;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  ${(props) => (props.alignment === "center" ? { textAlign: "center" } : {})}
  @media screen and (max-width: 428px) {
    font-size: 1.8rem;
  }
`;

export { MainHeading, SubHeading };
