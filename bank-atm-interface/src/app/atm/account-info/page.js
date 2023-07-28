"use client";
import { useUser } from "@/app/UserContext";
import {
  Grid,
  GridWrapper,
} from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";
import { SubPage } from "@/sharedPages";
import React, { useEffect, useState } from "react";

const AccountInfo = () => {
  const { postDataHandler, currencyFormatter, checkPINEntry, pin, setPin } =
    useUser();
  const [userInfo, setUserInfo] = useState({});

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
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/account-info`,
          {
            pin,
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
    pin && func();
  }, []);

  return (
    <SubPage subHeading="Here are your account details!" buttons={true}>
      <GridWrapper>
        <Grid title="Account Number:" value={userInfo.accountNumber} />
        <Grid title="Account Name:" value={userInfo.name} />
        <Grid
          title="Account Balance:"
          value={currencyFormatter(
            userInfo.accountBalance ? userInfo.accountBalance : 0
          )}
        />
        <Grid title="Email:" value={userInfo.email} />
      </GridWrapper>
    </SubPage>
  );
};

export default AccountInfo;
