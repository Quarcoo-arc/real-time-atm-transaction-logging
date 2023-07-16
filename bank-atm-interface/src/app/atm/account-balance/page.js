"use client";
import React from "react";
import { SubPage } from "@/sharedPages";
import { AccountBalText } from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";

const AccountBalance = () => {
  return (
    <SubPage subHeading="Here is your account balance!" buttons={true}>
      <AccountBalText>GH₵ 12000.00</AccountBalText>
    </SubPage>
  );
};

export default AccountBalance;
