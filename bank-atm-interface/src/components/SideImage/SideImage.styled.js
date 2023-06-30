"use client";
import styled from "@emotion/styled";
import Image from "next/image";

const ImageEl = styled(Image)`
  width: 50%;
  height: 100%;
  object-fit: cover;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export { ImageEl };
