"use client";
import styled from "@emotion/styled";

const BackComponent = styled.p`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    color: var(--gold-tint);
  }
`;

export { BackComponent };
