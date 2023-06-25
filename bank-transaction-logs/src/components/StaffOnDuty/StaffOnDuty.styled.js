import styled from "styled-components";

const Heading = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 1.875rem;
  font-weight: 700;
`;

const StaffName = styled.h4`
  margin: 0;
  font-size: 1.875rem;
  font-weight: 400;
`;

const StaffEmail = styled.h5`
  margin: 0;
  font-size: 1.5625rem;
  font-weight: 600;
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
`;

export { Heading, StaffEmail, StaffName, StaffInfoWrapper, StaffBtnWrapper };
