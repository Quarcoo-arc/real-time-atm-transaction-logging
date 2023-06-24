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

  const errorsMap = {
    NO_ERROR: cardsContentArr[0],
    TRANSACTION_TIMEOUT: cardsContentArr[1],
    INTERNAL_SERVER_ERROR: cardsContentArr[2],
    CONNECTION_DISCONNECTED: cardsContentArr[3],
  };

  const errorsMapReverse = {
    [cardsContentArr[0]]: "NO_ERROR",
    [cardsContentArr[1]]: "TRANSACTION_TIMEOUT",
    [cardsContentArr[2]]: "INTERNAL_SERVER_ERROR",
    [cardsContentArr[3]]: "CONNECTION_DISCONNECTED",
  };
  const [selectedCard, setSelectedCard] = useState(cardsContentArr[0]); // TODO: Move this into a context

  useEffect(() => {
    const getCurrentError = async () => {
      const fetchError = await fetch(`${base_url}/current-error`);
      const result = await fetchError.json();

      let currentError = cardsContentArr[0];
      if (result.success && errorsMap[result.data.error]) {
        currentError = errorsMap[result.data.error];
      }
      setSelectedCard(currentError);
    };

    getCurrentError();
  }, []);

  const selectCard = async (e) => {
    const err = e.target.textContent;

    if (!errorsMapReverse[err]) return;
    const result = await fetch(`${base_url}/current-error`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        error: errorsMapReverse[err],
      }),
    });
    const data = await result.json();
    if (data.success) {
      setSelectedCard(errorsMap[data.data.currentError]);
    }
  };

  return (
    <CardsWrapper>
      {cardsContentArr.map((card, idx) => (
        <Card
          key={idx}
          content={card}
          selected={card === selectedCard}
          onClick={selectCard}
        />
      ))}
    </CardsWrapper>
  );
};

export default CardDeck;
