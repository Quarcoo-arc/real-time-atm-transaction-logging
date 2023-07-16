"use client";
import React from "react";
import {
  Col,
  Container,
  Row,
  Text,
} from "./DepositWithdrawalComponents.styled";

const Grid = ({ title, value }) => {
  return (
    <Row>
      <Col>{title}</Col>
      <Text>{value}</Text>
    </Row>
  );
};

const GridWrapper = ({ children }) => <Container>{children}</Container>;

export { Grid, GridWrapper };
