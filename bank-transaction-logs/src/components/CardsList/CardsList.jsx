import { CardsListWrapper } from "./CardsList.styled";
import Card from "../Card/Card";

const cards = [
  { type: "total", number: 5000 },
  { type: "successful", number: 4000 },
  { type: "failed", number: 1000 },
];
const CardsList = () => {
  return (
    <CardsListWrapper>
      {cards.map((card, idx) => (
        <Card key={idx} type={card.type} number={card.number} />
      ))}
    </CardsListWrapper>
  );
};

export default CardsList;
