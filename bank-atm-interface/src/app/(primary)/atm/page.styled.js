"use client";
import styled from "@emotion/styled";
import Image from "next/image";

const ContentWrapper = styled.div`
  width: 95%;
  margin: 8rem auto;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 2rem 4rem;
  margin: 4rem 0 3rem;
`;

const StyledImage = styled(Image)`
  height: 2rem;
`;

export { ContentWrapper, CardsWrapper, StyledImage };
