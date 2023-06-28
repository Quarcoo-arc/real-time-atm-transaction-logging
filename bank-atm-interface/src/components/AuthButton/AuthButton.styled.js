"use client";
import styled from "@emotion/styled";

const Btn = styled.button`
  font-weight: 600;
  text-transform: capitalize;
  font-size: 2rem;
  background-color: var(--gold);
  border-radius: 55px;
  padding: 1rem 1.5rem;
  border: none;
  color: white;
  font-family: var(--font-poppins);
  cursor: pointer;
  &:hover {
    box-shadow: 2px 3px 1px rgba(0, 0, 0, 0.2);
  }
`;

export { Btn };
