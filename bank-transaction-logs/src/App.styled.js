import styled from "styled-components";

const StaffBtnAndSearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 95%;
  margin: 0 auto 2rem;
  @media screen and (max-width: 734px) {
    flex-direction: column;
    row-gap: 2rem;
    align-items: center;
  }
`;

export { StaffBtnAndSearchWrapper };
