"use client";
import { AmountEntryTextField, FormButton } from "@/components";
import { WrapAndCenter } from "@/components/Wrappers";
import { SubPage } from "@/sharedPages";
import { Box } from "@mui/material";
import React, { useState } from "react";

const DepositMoney = () => {
  const [amount, setAmount] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    amount ? alert("Depositing...") : alert("Please enter an amount");
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
