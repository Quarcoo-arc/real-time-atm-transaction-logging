"use client";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
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

const Text = styled.p`
  font-size: 2rem;
  font-weight: 600;
  @media screen and (max-width: 560px) {
    font-size: 1.8rem;
  }
`;

export { Container, Row, Col, Text };
