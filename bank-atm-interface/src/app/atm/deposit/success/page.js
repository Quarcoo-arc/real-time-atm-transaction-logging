"use client";
import { SubPage } from "@/sharedPages";
import React from "react";
import { Col, Container, Row, Text } from "./page.styled";
import {
  Grid,
  GridWrapper,
} from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";

const DepositSuccess = () => {
  return (
    <SubPage
      heading="Transaction Complete"
      subHeading="Your deposit was performed successfully"
      buttons={true}
    >
      <GridWrapper>
        <Grid title="Amount Deposited" value="GH₵ 15000" />
        <Grid title="Current Balance" value="GH₵ 5000" />
      </GridWrapper>
    </SubPage>
  );
};

export default DepositSuccess;
