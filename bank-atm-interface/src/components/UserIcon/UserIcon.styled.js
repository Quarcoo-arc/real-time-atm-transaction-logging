"use client";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  cursor: pointer;
  position: absolute;
  top: 1.2rem;
  right: 2rem;
  width: fit-content;
  @media screen and (max-width: 768px) {
    right: 1rem;
  }
  @media screen and (max-width: 428px) {
    right: 0.6rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid var(--blue);
  align-items: center;
  cursor: pointer;
  div {
    display: flex;
    flex-direction: column;
  }
`;

const Email = styled.p`
  font-weight: 700;
  font-size: 0.7rem;
`;

const LogoutWrapper = styled.div`
  padding: 0.6rem 0;
  color: #f50606;
  font-weight: 500;
  display: flex;
  gap: 0.4rem;
  cursor: pointer;
  justify-content: center;
  :hover {
    background-color: #f50606;
    color: white;
  }
`;

export { Wrapper, UserInfo, LogoutWrapper, Email };
