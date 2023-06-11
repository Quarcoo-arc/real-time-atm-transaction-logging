import styled from "styled-components";

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 59px 86px;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 3rem 1.5rem 5rem;
  @media screen and (max-width: 768px) {
    gap: 2.5rem;
  }
`;

export { CardsWrapper };
