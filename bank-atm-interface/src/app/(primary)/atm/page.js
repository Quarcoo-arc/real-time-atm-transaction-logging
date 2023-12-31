"use client";
import React, { useContext, useEffect, useState } from "react";
import { Background, Card, ConfirmLogutPopUp, Heading } from "@/components";
import { CardsWrapper, ContentWrapper } from "./page.styled";
import { LogoutRounded } from "@mui/icons-material";
import withdrawMoneyIcon from "/public/withdraw_money.svg";
import accountBalanceIcon from "/public/account_balance.svg";
import depositMoneyIcon from "/public/deposit_money.svg";
import accountInfoIcon from "/public/account_info.svg";
import changePINIcon from "/public/change_pin.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserContext from "../../UserContext";

const cardsContentArr = [
  {
    img: <Image alt="Account Balance" src={accountBalanceIcon} />,
    description: "Account Balance",
    redirectUrl: "/atm/account-balance",
  },
  {
    img: <Image alt="Deposit Money" src={depositMoneyIcon} />,
    description: "Deposit Money",
    redirectUrl: "/atm/deposit",
  },
  {
    img: <Image alt="Account Info" src={accountInfoIcon} />,
    description: "Account Info",
    redirectUrl: "/atm/account-info",
  },
  {
    img: <Image alt="Change PIN" src={changePINIcon} />,
    description: "Change PIN",
    redirectUrl: "/atm/auth/pin-change",
  },
  {
    img: <Image alt="Withdraw Money" src={withdrawMoneyIcon} />,
    description: "Withdraw Money",
    redirectUrl: "/atm/withdraw",
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
  const [openDialogue, setOpenDialogue] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { user, checkAuth, setIsLoading } = useContext(UserContext);

  useEffect(() => {
    setUsername(user && user.name ? user.name?.split(" ")[0] : "");
  }, []);

  useEffect(() => {
    checkAuth();
    setIsLoading(false);
  }, []);

  return (
    <ContentWrapper>
      <Background />
      <Heading>Hi {username}!</Heading>
      <Heading type="sub">Please select a transaction</Heading>
      <CardsWrapper>
        {cardsContentArr.map((el, idx) => (
          <Card
            key={idx}
            img={el.img}
            description={el.description}
            onClick={
              el.redirectUrl
                ? () => {
                    setIsLoading(true);
                    router.push(el.redirectUrl);
                  }
                : () => setOpenDialogue(true)
            }
          />
        ))}
      </CardsWrapper>
      <ConfirmLogutPopUp open={openDialogue} setOpen={setOpenDialogue} />
    </ContentWrapper>
  );
};

export default ATMHome;
