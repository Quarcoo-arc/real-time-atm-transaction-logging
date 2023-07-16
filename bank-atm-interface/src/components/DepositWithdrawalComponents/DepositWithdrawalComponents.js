"use client";
import React from "react";
import {
  Col,
  Container,
  Row,
  GridValueText,
  InfoText,
} from "./DepositWithdrawalComponents.styled";

const Grid = ({ title, value }) => {
  return (
    <Row>
      <Col>{title}</Col>
      <GridValueText>{value}</GridValueText>
    </Row>
  );
};

const PageInfoText = ({ children }) => <InfoText>{children}</InfoText>;

const GridWrapper = ({ children }) => <Container>{children}</Container>;

export { Grid, GridWrapper, PageInfoText };
