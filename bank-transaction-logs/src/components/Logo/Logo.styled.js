import styled from "styled-components";

const LogoText = styled.h1`
  font-family: "Dancing Script", cursive;
  font-size: 75px;
  line-height: 96px;
  color: white;
  padding: 1rem 0 0 2rem;
  margin: 0;
  @media screen and (max-width: 768px) {
    font-size: 60px;
    line-height: 60px;
    padding-left: 1rem;
  }
  @media screen and (max-width: 426px) {
    font-size: 40px;
  }
`;

export { LogoText };
