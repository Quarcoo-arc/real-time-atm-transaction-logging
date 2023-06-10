import styled from "styled-components";

const LogoText = styled.h1`
  font-family: "Dancing Script", cursive;
  font-size: 75px;
  line-height: 96px;
  color: white;
  margin: 1rem 0 0 2rem;
  @media screen and (max-width: 768px) {
    font-size: 60px;
    line-height: 60px;
    margin-left: 1rem;
  }
  @media screen and (max-width: 426px) {
    font-size: 40px;
  }
`;

export { LogoText };
