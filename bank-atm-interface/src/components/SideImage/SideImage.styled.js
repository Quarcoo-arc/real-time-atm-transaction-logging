"use client";
import styled from "@emotion/styled";
import Image from "next/image";

const ImageEl = styled(Image)`
  width: 50vw;
  height: 100vh;
  object-fit: cover;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export { ImageEl };
