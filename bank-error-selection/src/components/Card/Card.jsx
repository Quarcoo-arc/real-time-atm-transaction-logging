import { CardWrapper } from "./Card.styled";

const Card = ({ content, selected, onClick }) => {
  return (
    <CardWrapper selected={selected} onClick={onClick}>
      {content}
    </CardWrapper>
  );
};

export default Card;
