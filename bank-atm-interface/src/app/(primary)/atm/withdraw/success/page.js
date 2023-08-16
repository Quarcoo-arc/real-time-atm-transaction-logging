"use client";
import { SubPage } from "@/sharedPages";
import React, { useEffect, useState } from "react";
import {
  Grid,
  GridWrapper,
} from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";
import { useUser } from "@/app/UserContext";
import { useRouter } from "next/navigation";

const WithdrawalSuccess = () => {
  const { withdrawalInfo, currencyFormatter, setWithdrawalInfo, setIsLoading } =
    useUser();
  const [data, setData] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (!withdrawalInfo || !withdrawalInfo.success) {
      setIsLoading(true);
      router.push("/atm");
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
    withdrawalInfo.success && setData({ ...withdrawalInfo });

    return () => {
      setWithdrawalInfo({});
    };
  }, []);

  return (
    <SubPage
      heading="Transaction Complete"
      subHeading="Your withdrawal was performed successfully"
      buttons={true}
    >
      <GridWrapper>
        <Grid
          title="Amount Withdrawn:"
          value={currencyFormatter(data.amount ? data.amount : 0)}
        />
        <Grid
          title="Current Balance:"
          value={currencyFormatter(
            data.currentBalance ? data.currentBalance : 0
          )}
        />
      </GridWrapper>
    </SubPage>
  );
};

export default WithdrawalSuccess;
