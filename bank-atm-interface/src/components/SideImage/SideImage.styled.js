"use client";
import styled from "@emotion/styled";
import Image from "next/image";

const ImageEl = styled(Image)`
  width: 50vw;
  min-height: 100vh;
  height: 100%;
  object-fit: cover;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export { ImageEl };
