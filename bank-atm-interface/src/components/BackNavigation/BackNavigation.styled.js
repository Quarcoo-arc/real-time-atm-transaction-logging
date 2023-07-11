"use client";
import styled from "@emotion/styled";

const BackNavigationWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  h3 {
    font-size: 2rem;
    font-weight: 500;
  }
  cursor: pointer;
  :hover {
    color: var(--gold-tint);
  }
`;

export { BackNavigationWrapper };
