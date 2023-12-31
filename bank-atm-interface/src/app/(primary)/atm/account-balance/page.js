"use client";
import React, { useEffect, useState } from "react";
import { SubPage } from "@/sharedPages";
import { AccountBalText } from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";
import { useUser } from "@/app/UserContext";

const AccountBalance = () => {
  const {
    postDataHandler,
    currencyFormatter,
    checkPINEntry,
    pin,
    setPin,
    setIsLoading,
  } = useUser();
  const [accountBalance, setAccountBalance] = useState(0);
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
        setIsLoading(true);
        const result = await postDataHandler(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/account-balance`,
          {
            pin,
          }
        );
        if (result.success) {
          setIsLoading(false);
          setAccountBalance(result.data.accountBalance);
        } else {
          setIsLoading(false);
          setDisplayAlert(true);
          setErrorMessage(
            result.message ? result.message : "Something went wrong."
          );
        }
      } catch (error) {
        setIsLoading(false);
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
      subHeading="Here is your account balance!"
      buttons={true}
      setOpenSnackBar={setDisplayAlert}
      alertMessage={errorMessage}
      openSnackBar={displayAlert}
    >
      <AccountBalText>{currencyFormatter(accountBalance)}</AccountBalText>
    </SubPage>
  );
};

export default AccountBalance;
