import styled, { css } from "styled-components";

const CardWrapper = styled.div`
  width: 413px;
  height: 183px;
  color: black;
  background-color: white;
  border-radius: 10px;
  font-size: 45px;
  font-weight: 600;
  display: flex;
  text-align: center;
  place-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  ${(props) =>
    props.selected &&
    css`
      background-color: #c2993a;
      color: white;
    `}

  @media screen and (max-width: 768px) {
    width: 15rem;
    height: 7rem;
    font-size: 1.6rem;
  }
`;

export { CardWrapper };
