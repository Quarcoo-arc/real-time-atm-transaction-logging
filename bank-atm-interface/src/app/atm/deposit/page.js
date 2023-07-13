"use client";
import { AmountEntryTextField } from "@/components";
import { SubPage } from "@/sharedPages";
import React, { useState } from "react";

const DepositMoney = () => {
  const [amount, setAmount] = useState("");
  const validateAmount = (e) => {
    const amount = e.target.value;
    const regex = /^([1-9][0-9]*(\.[0-9]{0,2})?$)|^(0?(\.[0-9]{0,2})?)$/;
    if (!amount || regex.test(amount.toString())) {
      setAmount(amount);
    }
  };
  return (
    <SubPage subHeading="Please enter the amount you wish to deposit">
      <AmountEntryTextField value={amount} onChange={validateAmount} />
    </SubPage>
  );
};

export default DepositMoney;
