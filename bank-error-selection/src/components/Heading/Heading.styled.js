import styled from "styled-components";

const H1 = styled.h1`
  color: #e1d4bb;
  text-align: center;
  margin-top: 3rem;
  @media screen and (max-width: 426px) {
    font-size: 1.7rem;
    margin-top: revert;
  }
`;

export { H1 };
