"use client";
import styled from "@emotion/styled";

const WrapAndLeft = styled.div`
  width: 25rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-family: var(--font-poppins);
  font-size: 1.5rem;
  span {
    font-size: 1.2rem;
    font-style: italic;
  }
  @media screen and (max-width: 420px) {
    width: 18rem;
  }
  @media screen and (min-width: 1440px) {
    width: 60%;
  }
`;

export { WrapAndLeft };
