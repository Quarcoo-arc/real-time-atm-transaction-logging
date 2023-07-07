"use client";
import React from "react";
import { Card, Heading } from "@/components";
import { CardsWrapper, ContentWrapper } from "./page.styled";
import { LogoutRounded } from "@mui/icons-material";
import withdrawMoneyIcon from "../../../public/withdraw_money.svg?url";
import accountBalanceIcon from "../../../public/account_balance.svg?url";
import depositMoneyIcon from "../../../public/deposit_money.svg?url";
import accountInfoIcon from "../../../public/account_info.svg?url";
import changePINIcon from "../../../public/change_pin.svg?url";
import Image from "next/image";

const cardsContentArr = [
  {
    img: <Image src={accountBalanceIcon} />,
    description: "Account Balance",
  },
  {
    img: <Image src={depositMoneyIcon} />,
    description: "Deposit Money",
  },
  {
    img: <Image src={accountInfoIcon} />,
    description: "Account Info",
  },
  {
    img: <Image src={changePINIcon} />,
    description: "Change PIN",
  },
  {
    img: <Image src={withdrawMoneyIcon} />,
    description: "Withdraw Money",
  },
  {
    img: <LogoutRounded sx={{ fontSize: "3rem" }} />,
    description: "Exit",
  },
];

const ATMHome = () => {
  return (
    <ContentWrapper>
      <Heading>Hi Michael!</Heading>
      <Heading type="sub">Please select a transaction</Heading>
      <CardsWrapper>
        {cardsContentArr.map((el, idx) => (
          <Card key={idx} img={el.img} description={el.description} />
        ))}
      </CardsWrapper>
    </ContentWrapper>
  );
};

export default ATMHome;
