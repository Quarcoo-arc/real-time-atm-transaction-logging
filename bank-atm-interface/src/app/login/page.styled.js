"use client";
import styled from "@emotion/styled";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 5rem;
  @media screen and (max-width: 768px) {
    align-items: center;
    text-align: center;
    gap: 4rem;
  }
  @media screen and (max-width: 425px) {
    gap: 3.5rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  a {
    align-self: flex-end;
    font-weight: 600;
    :hover {
      color: var(--gold-tint);
    }
  }
`;

const WrapAndCenter = styled.div`
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

export { Wrapper, WrapAndCenter, ContentWrapper };
