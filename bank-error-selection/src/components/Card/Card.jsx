import { CardWrapper } from "./Card.styled";

const Card = ({ content, selected }) => {
  return <CardWrapper selected={selected}>{content}</CardWrapper>;
};

export default Card;
