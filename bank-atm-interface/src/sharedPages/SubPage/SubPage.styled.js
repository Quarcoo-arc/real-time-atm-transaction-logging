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
  gap: 1rem;
  alignitems: center;
`;

export { ContentWrapper, BodyWrapper, ButtonsWrapper };
