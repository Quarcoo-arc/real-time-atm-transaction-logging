"use client";
import { SubPage } from "@/sharedPages";
import React, { useEffect, useState } from "react";
import {
  Grid,
  GridWrapper,
  PageInfoText,
} from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";
import { useUser } from "@/app/UserContext";

const WithdrawalError = () => {
  const [error, setError] = useState("");
  const { withdrawalInfo, setWithdrawalInfo } = useUser();

  useEffect(() => {
    if (!withdrawalInfo || withdrawalInfo.success) {
      router.push("/atm");
    }
  }, []);

  useEffect(() => {
    console.log(withdrawalInfo);
    !withdrawalInfo.success && setError(withdrawalInfo.error);

    return () => {
      setWithdrawalInfo({});
    };
  }, []);

  return (
    <SubPage
      heading="Transaction Failed"
      subHeading="Your withdrawal was not performed"
      buttons={true}
    >
      <GridWrapper>
        {error === "Insufficient User Funds" ? (
          <>
            <PageInfoText>
              You do not have sufficient funds to perform this transaction.
            </PageInfoText>
            <Grid title="Current Balance:" value="GH₵ 1200.00" />
          </>
        ) : error === "Insufficient ATM Funds" ? (
          <PageInfoText>
            There is not enough funds in the ATM to complete this transaction.
          </PageInfoText>
        ) : (
          <PageInfoText>
            Please try again!
            <br />
            If the problem persists, kindly contact the Bank Support Center on{" "}
            <span>+233 555 93 5570</span>
          </PageInfoText>
        )}
      </GridWrapper>
    </SubPage>
  );
};

export default WithdrawalError;
