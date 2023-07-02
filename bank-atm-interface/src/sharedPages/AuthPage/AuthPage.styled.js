"use client";
import styled from "@emotion/styled";

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  margin-top: 10rem;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-top: 8rem;
    width: 100%;
  }
`;

export { FlexWrapper, ContentWrapper };
