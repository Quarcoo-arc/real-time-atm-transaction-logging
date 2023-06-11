import { useState } from "react";
import Card from "../Card/Card";
import { CardsWrapper } from "./CardDeck.styled";

const CardDeck = () => {
  const cardsContentArr = [
    "No Error",
    "Transaction Timeout",
    "Internal Server Error",
    "Connection Disconnected",
  ];
  const [selectedCard, setSelectedCard] = useState(cardsContentArr[0]); // TODO: Move this into a context
  return (
    <CardsWrapper>
      {cardsContentArr.map((card, idx) => (
        <Card key={idx} content={card} selected={card === selectedCard} />
      ))}
    </CardsWrapper>
  );
};

export default CardDeck;
