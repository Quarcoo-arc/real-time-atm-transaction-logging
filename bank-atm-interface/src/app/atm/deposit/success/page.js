"use client";
import { SubPage } from "@/sharedPages";
import React, { useEffect, useState } from "react";
import {
  Grid,
  GridWrapper,
} from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";
import { useUser } from "@/app/UserContext";
import { useRouter } from "next/navigation";

const DepositSuccess = () => {
  const { depositInfo, currencyFormatter, setDepositInfo } = useUser();
  const [data, setData] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!depositInfo || !depositInfo.success) {
      router.push("/atm");
    }
  }, []);

  useEffect(() => {
    depositInfo.success && setData({ ...depositInfo });

    return () => {
      setDepositInfo({});
    };
  }, []);

  return (
    <SubPage
      heading="Transaction Complete"
      subHeading="Your deposit was performed successfully"
      buttons={true}
    >
      <GridWrapper>
        <Grid
          title="Amount Deposited:"
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

export default DepositSuccess;
