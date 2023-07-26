"use client";
import UserContext from "@/app/UserContext";
import {
  Grid,
  GridWrapper,
} from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";
import { SubPage } from "@/sharedPages";
import React, { useContext, useEffect, useState } from "react";

const AccountInfo = () => {
  const { postDataHandler, currencyFormatter } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const func = async () => {
      try {
        const result = await postDataHandler(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/account-info`,
          {
            pin: "1234",
          }
        );
        if (result.success) {
          setUserInfo(result.data);
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
    <SubPage subHeading="Here are your account details!" buttons={true}>
      <GridWrapper>
        <Grid title="Account Number:" value={userInfo.accountNumber} />
        <Grid title="Account Name:" value={userInfo.name} />
        <Grid
          title="Account Balance:"
          value={currencyFormatter(userInfo.accountBalance)}
        />
        <Grid title="Email:" value={userInfo.email} />
      </GridWrapper>
    </SubPage>
  );
};

export default AccountInfo;
