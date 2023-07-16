"use client";
import {
  Grid,
  GridWrapper,
} from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";
import { SubPage } from "@/sharedPages";
import React from "react";

const AccountInfo = () => {
  return (
    <SubPage subHeading="Here are your account details!" buttons={true}>
      <GridWrapper>
        <Grid title="Account Number:" value="0000000002" />
        <Grid title="Account Name:" value="Michael Quarcoo" />
        <Grid title="Account Balance:" value="GH₵ 120,000.00" />
        <Grid title="Email:" value="michaelquarcoo04@gmail.com" />
      </GridWrapper>
    </SubPage>
  );
};

export default AccountInfo;
