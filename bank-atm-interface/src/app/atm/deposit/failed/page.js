"use client";
import { SubPage } from "@/sharedPages";
import React from "react";
import {
  Grid,
  GridWrapper,
} from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";
import { InfoText } from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents.styled";

const WithdrawalSuccess = () => {
  return (
    <SubPage
      heading="Transaction Failed"
      subHeading="Your deposit was not performed"
      buttons={true}
    >
      <GridWrapper>
        <InfoText>
          <div>Please try again!</div>
          If the problem persists, kindly contact the Bank Support Center on{" "}
          <span>+233 555 93 5570</span>
        </InfoText>
      </GridWrapper>
    </SubPage>
  );
};

export default WithdrawalSuccess;
