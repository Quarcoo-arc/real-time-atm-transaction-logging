"use client";
import { SubPage } from "@/sharedPages";
import React, { useEffect, useState } from "react";
import {
  Grid,
  GridWrapper,
  PageInfoText,
} from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";
import { useUser } from "@/app/UserContext";
import styled from "@emotion/styled";

const GridItemWrapper = styled.div`
  margin: 0 auto;
  width: fit-content;
`;

const WithdrawalError = () => {
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(0);
  const { withdrawalInfo, currencyFormatter, setWithdrawalInfo, setIsLoading } =
    useUser();

  useEffect(() => {
    if (!withdrawalInfo || withdrawalInfo.success) {
      setIsLoading(true);
      router.push("/atm");
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
    if (withdrawalInfo.success === false) {
      setError(withdrawalInfo.error);
      setBalance(withdrawalInfo.data ? withdrawalInfo.data.accountBalance : 0);
    }

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
            <GridItemWrapper>
              <Grid
                title="Current Balance:"
                value={currencyFormatter(balance)}
              />
            </GridItemWrapper>
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
