import styled from "styled-components";

const CardsListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin: 2rem 0 4rem;
  @media screen and (max-width: 768px) {
    gap: 1rem;
  }
`;

export { CardsListWrapper };
