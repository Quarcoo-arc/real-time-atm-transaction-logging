import { CardWrapper } from "./Card.styled";

/**
 *
 * @param {String} type
 * @param {Number} number
 * @returns
 */
const Card = ({ type, number }) => {
  return (
    <CardWrapper type={type}>
      <h4>{type.charAt(0).toUpperCase() + type.slice(1)} Transactions</h4>{" "}
      <h3>{number.toLocaleString()}</h3>
    </CardWrapper>
  );
};

export default Card;
