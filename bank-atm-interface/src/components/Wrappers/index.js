"use client";
import styled from "@emotion/styled";

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 5rem;
  margin-bottom: 2rem;
  @media screen and (max-width: 768px) {
    align-items: center;
    text-align: center;
    gap: 4rem;
  }
  @media screen and (max-width: 425px) {
    gap: 3.5rem;
  }
`;

export const WrapAndCenter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  a {
    align-self: center;
    :hover {
      color: var(--gold-tint);
    }
    span {
      font-weight: 600;
    }
  }
`;
