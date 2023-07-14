"use client";
import { SubPage } from "@/sharedPages";
import React from "react";
import { Col, Container, Row, Text } from "./page.styled";

const DepositSuccess = () => {
  return (
    <SubPage
      heading="Transaction Complete"
      subHeading="Your deposit was performed successfully"
      buttons={true}
    >
      <Container>
        <Row>
          <Col>Amount Deposited:</Col>
          <Text>GHC 15000</Text>
        </Row>
        <Row>
          <Col>Current Balance:</Col>
          <Text>GHC 150</Text>
        </Row>
      </Container>
    </SubPage>
  );
};

export default DepositSuccess;
