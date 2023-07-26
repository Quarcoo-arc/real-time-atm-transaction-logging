"use client";
import React, { useContext, useEffect, useState } from "react";
import { SubPage } from "@/sharedPages";
import { AccountBalText } from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";
import UserContext from "@/app/UserContext";

const AccountBalance = () => {
  const { postDataHandler, currencyFormatter } = useContext(UserContext);
  const [accountBalance, setAccountBalance] = useState(0);
  useEffect(() => {
    const func = async () => {
      try {
        const result = await postDataHandler(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/account-balance`,
          {
            pin: "1234",
          }
        );
        if (result.success) {
          console.log("We are here!");
          setAccountBalance(result.data.accountBalance);
        } else {
          // TODO: Display modal with retry functionality
        }
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, []);
  return (
    <SubPage subHeading="Here is your account balance!" buttons={true}>
      <AccountBalText>{currencyFormatter(accountBalance)}</AccountBalText>
    </SubPage>
  );
};

export default AccountBalance;
