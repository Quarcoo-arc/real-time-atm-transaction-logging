import styled from "styled-components";

const Heading = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 1.875rem;
  font-weight: 700;
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 425px) {
    font-size: 1.2rem;
  }
`;

const StaffName = styled.h4`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 400;
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 425px) {
    font-size: 1rem;
  }
`;

const StaffEmail = styled.h5`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 425px) {
    font-size: 0.8rem;
  }
`;

const StaffInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  text-transform: none;
  color: black;
`;

const StaffBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;
  font-family: Poppins;
  padding: 0.5rem 0.6rem 0.5rem 0.5rem;
  @media screen and (max-width: 425px) {
    padding: 0.3rem 0.4rem 0.3rem 0.3rem;
  }
`;

export { Heading, StaffEmail, StaffName, StaffInfoWrapper, StaffBtnWrapper };
