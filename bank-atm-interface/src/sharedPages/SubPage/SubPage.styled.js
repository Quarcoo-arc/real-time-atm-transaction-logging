"use client";
import styled from "@emotion/styled";

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 95%;
  justify-content: center;
  margin: 10rem auto 3rem;
  align-items: center;
`;

const BodyWrapper = styled.div`
  margin-top: 4rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-top: 2rem;
  @media screen and (max-width: 428px) {
    gap: 2rem;
  }
`;

export { ContentWrapper, BodyWrapper, ButtonsWrapper };
