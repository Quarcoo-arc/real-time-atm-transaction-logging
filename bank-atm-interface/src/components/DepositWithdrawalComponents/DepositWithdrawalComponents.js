"use client";
import React from "react";
import {
  Col,
  Container,
  Row,
  GridValueText,
} from "./DepositWithdrawalComponents.styled";

const Grid = ({ title, value }) => {
  return (
    <Row>
      <Col>{title}</Col>
      <GridValueText>{value}</GridValueText>
    </Row>
  );
};

const GridWrapper = ({ children }) => <Container>{children}</Container>;

export { Grid, GridWrapper };
