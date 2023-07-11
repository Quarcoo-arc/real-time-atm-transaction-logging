"use client";
import styled from "@emotion/styled";

const BackNavigationWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  top: 1.2rem;
  right: 2rem;
  h3 {
    font-size: 2rem;
    font-weight: 500;
  }
  cursor: pointer;
  :hover {
    color: var(--gold-tint);
  }
  @media screen and (max-width: 768px) {
    right: 1rem;
  }
  @media screen and (max-width: 428px) {
    right: 0.6rem;
  }
`;

export { BackNavigationWrapper };
