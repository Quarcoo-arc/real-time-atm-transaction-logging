"use client";
import React from "react";
import { Background, Card, Heading } from "@/components";
import { CardsWrapper, ContentWrapper } from "./page.styled";
import { LogoutRounded } from "@mui/icons-material";
import withdrawMoneyIcon from "../../../public/withdraw_money.svg";
import accountBalanceIcon from "../../../public/account_balance.svg";
import depositMoneyIcon from "../../../public/deposit_money.svg";
import accountInfoIcon from "../../../public/account_info.svg";
import changePINIcon from "../../../public/change_pin.svg";
import Image from "next/image";

const cardsContentArr = [
  {
    img: <Image alt="Account Balance" src={accountBalanceIcon} />,
    description: "Account Balance",
  },
  {
    img: <Image alt="Deposit Money" src={depositMoneyIcon} />,
    description: "Deposit Money",
  },
  {
    img: <Image alt="Account Info" src={accountInfoIcon} />,
    description: "Account Info",
  },
  {
    img: <Image alt="Change PIN" src={changePINIcon} />,
    description: "Change PIN",
  },
  {
    img: <Image alt="Withdraw Money" src={withdrawMoneyIcon} />,
    description: "Withdraw Money",
  },
  {
    img: (
      <LogoutRounded
        sx={{
          fontSize: "3rem",
          "@media screen and (max-width: 741px)": {
            fontSize: "2rem",
          },
        }}
      />
    ),
    description: "Exit",
  },
];

const ATMHome = () => {
  return (
    <ContentWrapper>
      <Background />
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
