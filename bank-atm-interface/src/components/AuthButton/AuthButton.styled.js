"use client";
import styled from "@emotion/styled";

const Btn = styled.button`
  font-weight: 600;
  text-transform: capitalize;
  font-size: 1.5rem;
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
  position: absolute;
  top: 1.2rem;
  right: 2rem;
  @media screen and (max-width: 768px) {
    right: 1rem;
    font-size: 1.3rem;
    top: 1rem;
  }
  @media screen and (max-width: 426px) {
    font-size: 1rem;
    padding: 0.6rem 1rem;
    top: 1.2rem;
  }
`;

export { Btn };
