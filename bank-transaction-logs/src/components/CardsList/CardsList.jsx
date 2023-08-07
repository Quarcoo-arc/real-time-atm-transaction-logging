import { CardsListWrapper } from "./CardsList.styled";
import Card from "../Card/Card";
import { useLogs } from "../../contexts/LogsContext";
import { useEffect, useState } from "react";

const cards = ["total", "successful", "failed"];
const CardsList = () => {
  const { successful, failed, total } = useLogs();

  return (
    <CardsListWrapper>
      <Card key={"total"} type={"total"} number={total} />
      <Card key={"successful"} type={"successful"} number={successful} />
      <Card key={"failed"} type={"failed"} number={failed} />
    </CardsListWrapper>
  );
};

export default CardsList;
