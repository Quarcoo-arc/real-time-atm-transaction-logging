"use client";
import styled from "@emotion/styled";

const BackgroundWrapper = styled.div`
  display: flex;
  z-index: -1;
  position: absolute;
  width: 95%;
  height: 100%;
  img {
    width: 100%;
    opacity: 0.6;
    object-fit: cover;
  }
`;

export { BackgroundWrapper };
