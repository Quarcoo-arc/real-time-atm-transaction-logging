"use client";
import { SubPage } from "@/sharedPages";
import React from "react";
import {
  Grid,
  GridWrapper,
} from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";

const WithdrawalSuccess = () => {
  return (
    <SubPage
      heading="Transaction Complete"
      subHeading="Your withdrawal was performed successfully"
      buttons={true}
    >
      <GridWrapper>
        <Grid title="Amount Withdrawn:" value="GH₵ 15000" />
        <Grid title="Current Balance:" value="GH₵ 5000" />
      </GridWrapper>
    </SubPage>
  );
};

export default WithdrawalSuccess;
