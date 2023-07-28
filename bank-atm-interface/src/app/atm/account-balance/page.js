"use client";
import React, { useEffect, useState } from "react";
import { SubPage } from "@/sharedPages";
import { AccountBalText } from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";
import { useUser } from "@/app/UserContext";

const AccountBalance = () => {
  const { postDataHandler, currencyFormatter, checkPINEntry, pin, setPin } =
    useUser();
  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    checkPINEntry();
    return () => {
      setPin("");
    };
  }, []);

  useEffect(() => {
    const func = async () => {
      try {
        const result = await postDataHandler(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/account-balance`,
          {
            pin,
          }
        );
        if (result.success) {
          setAccountBalance(result.data.accountBalance);
        } else {
          // TODO: Display modal with retry functionality
        }
      } catch (error) {
        console.log(error);
      }
    };
    pin && func();
  }, []);
  return (
    <SubPage subHeading="Here is your account balance!" buttons={true}>
      <AccountBalText>{currencyFormatter(accountBalance)}</AccountBalText>
    </SubPage>
  );
};

export default AccountBalance;
