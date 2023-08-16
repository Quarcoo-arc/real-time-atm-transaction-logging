"use client";
import { useUser } from "@/app/UserContext";
import { AmountEntryTextField, FormButton } from "@/components";
import { WrapAndCenter } from "@/components/Wrappers";
import { SubPage } from "@/sharedPages";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DepositMoney = () => {
  const [amount, setAmount] = useState("");
  const {
    checkPINEntry,
    setPin,
    pin,
    postDataHandler,
    setDepositInfo,
    setIsLoading,
  } = useUser();
  const router = useRouter();

  useEffect(() => {
    checkPINEntry();
    setIsLoading(false);
    return () => {
      setPin("");
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (amount) {
      try {
        const result = await postDataHandler(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/deposit`,
          {
            pin,
            amount: +amount,
          }
        );

        if (result.success) {
          setDepositInfo({
            success: true,
            amount,
            currentBalance: result.data.currentBalance,
          });
          router.push("/atm/deposit/success");
        } else {
          setDepositInfo({
            success: false,
            error: result.error,
          });
          router.push("/atm/deposit/error");
        }
      } catch (error) {
        setDepositInfo({
          success: false,
          error,
        });
        router.push("/atm/deposit/error");
      }
    }
  };

  return (
    <SubPage subHeading="Please enter the amount you wish to deposit">
      <WrapAndCenter>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="form"
          onSubmit={submitHandler}
        >
          <AmountEntryTextField
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "25rem",
              "@media screen and (max-width: 420px)": {
                width: "18rem",
              },
              "@media screen and (min-width: 1440px)": {
                width: "60%",
              },
            }}
          >
            <FormButton type="submit">Deposit</FormButton>
          </Box>
        </Box>
      </WrapAndCenter>
    </SubPage>
  );
};

export default DepositMoney;
