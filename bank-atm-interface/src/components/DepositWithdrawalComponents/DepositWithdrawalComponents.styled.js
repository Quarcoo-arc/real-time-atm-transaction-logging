"use client";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  justify-self: center;
  align-self: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  @media screen and (max-width: 428px) {
    align-items: center;
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  @media screen and (max-width: 428px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Col = styled.div`
  width: 20rem;
  font-size: 1.5rem;
  @media screen and (max-width: 560px) {
    width: 16rem;
    font-size: 1.3rem;
  }
  @media screen and (max-width: 428px) {
    width: 13rem;
  }
`;

const GridValueText = styled.p`
  font-size: 2rem;
  font-weight: 600;
  word-wrap: break-word;
  max-width: 20rem;
  @media screen and (max-width: 560px) {
    font-size: 1.8rem;
  }
  @media screen and (max-width: 354px) {
    max-width: 16rem;
  }
  @media screen and (min-width: 1400px) {
    max-width: 40rem;
  }
`;

const InfoText = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
  width: 70%;
  margin: 0 auto;
  span {
    color: #e6e6e6;
    font-weight: 700;
    font-size: 1.7rem;
  }
  @media screen and (max-width: 991px) {
    width: 100%;
  }
  @media screen and (max-width: 428px) {
    font-size: 1.6rem;
    span {
      font-size: 1.5rem;
    }
  }
`;

const AccountBalance = styled.h3`
  font-weight: 700;
  font-size: 5rem;
  text-align: center;
  @media screen and (max-width: 665px) {
    font-size: 3.5rem;
  }
`;

export { Container, Row, Col, GridValueText, InfoText, AccountBalance };
