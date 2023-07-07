"use client";
import styled from "@emotion/styled";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  background: white;
  box-sizing: border-box;
  border-radius: 1.25rem;
  cursor: pointer;
  width: 20rem;
  height: 10rem;
  color: black;
  @media screen and (max-width: 741px) {
    width: 15rem;
    height: 7rem;
    gap: 1rem;
    border-radius: 0.8rem;
  }
  img {
    width: 3rem !important;
    height: fit-content !important;
    @media screen and (max-width: 741px) {
      width: 2rem !important;
    }
  }
  :hover {
    background: none;
    border: 2px solid white;
    color: white;
    svg,
    path {
      fill: white;
    }
    img {
      filter: brightness(0) invert(1);
    }
  }
`;

const CardDescription = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  font-weight: 500;
  text-transform: capitalize;
  @media screen and (max-width: 741px) {
    font-size: 1rem;
  }
`;

export { CardContainer, CardDescription };
