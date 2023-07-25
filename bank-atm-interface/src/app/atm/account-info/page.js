"use client";
import CookiesContext from "@/app/CookiesContext";
import {
  Grid,
  GridWrapper,
} from "@/components/DepositWithdrawalComponents/DepositWithdrawalComponents";
import { SubPage } from "@/sharedPages";
import React, { useContext, useEffect } from "react";

const AccountInfo = () => {
  const { setAllCookies } = useContext(CookiesContext);
  setAllCookies();
  useEffect(() => {
    const func = async () => {
      try {
        const fetchData = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/account-info`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pin: "1234",
            }),
          }
        );

        const data = await fetchData.json();

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, []);

  return (
    <SubPage subHeading="Here are your account details!" buttons={true}>
      <GridWrapper>
        <Grid title="Account Number:" value="0000000002" />
        <Grid title="Account Name:" value="Michael Quarcoo" />
        <Grid title="Account Balance:" value="GH₵ 120,000.00" />
        <Grid title="Email:" value="michaelquarcoo04@gmail.com" />
      </GridWrapper>
    </SubPage>
  );
};

export default AccountInfo;
