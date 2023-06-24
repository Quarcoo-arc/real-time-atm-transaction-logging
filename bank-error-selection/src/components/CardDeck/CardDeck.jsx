import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { CardsWrapper } from "./CardDeck.styled";

const base_url = import.meta.env.VITE_BACKEND_BASE_URL;

const CardDeck = () => {
  const cardsContentArr = [
    "No Error",
    "Transaction Timeout",
    "Internal Server Error",
    "Connection Disconnected",
  ];
  const [selectedCard, setSelectedCard] = useState(cardsContentArr[0]); // TODO: Move this into a context

  useEffect(() => {
    const getCurrentError = async () => {
      const currentError = await fetch(`${base_url}/current-error`);

      setSelectedCard(
        currentError
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
      console.log(
        currentError
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    };

    getCurrentError();
  }, []);

  return (
    <CardsWrapper>
      {cardsContentArr.map((card, idx) => (
        <Card
          key={idx}
          content={card}
          selected={card === selectedCard}
          onClick={() => setSelectedCard(card)}
        />
      ))}
    </CardsWrapper>
  );
};

export default CardDeck;
