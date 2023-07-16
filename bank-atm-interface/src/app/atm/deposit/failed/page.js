"use client";
import { SubPage } from "@/sharedPages";
import React from "react";
import {
  GridWrapper,
  PageInfoText,
} from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";

const WithdrawalSuccess = () => {
  return (
    <SubPage
      heading="Transaction Failed"
      subHeading="Your deposit was not performed"
      buttons={true}
    >
      <GridWrapper>
        <PageInfoText>
          Please try again!
          <br />
          If the problem persists, kindly contact the Bank Support Center on{" "}
          <span>+233 555 93 5570</span>
        </PageInfoText>
      </GridWrapper>
    </SubPage>
  );
};

export default WithdrawalSuccess;
