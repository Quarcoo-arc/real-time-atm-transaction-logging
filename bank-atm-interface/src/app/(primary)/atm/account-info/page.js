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
  const [displayAlert, setDisplayAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
          setDisplayAlert(true);
          setErrorMessage(
            result.message ? result.message : "Something went wrong."
          );
        }
      } catch (error) {
        setDisplayAlert(true);
        setErrorMessage(
          error.message
            ? error.message
            : error
            ? error
            : "Something went wrong."
        );
      }
    };
    pin && func();
  }, []);

  return (
    <SubPage
      subHeading="Here are your account details!"
      buttons={true}
      setOpenSnackBar={setDisplayAlert}
      alertMessage={errorMessage}
      openSnackBar={displayAlert}
    >
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
