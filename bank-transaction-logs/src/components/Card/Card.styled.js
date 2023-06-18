import styled from "styled-components";

const CardWrapper = styled.div`
  width: 24rem;
  height: 13rem;
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  place-items: center;
  justify-content: center;
  row-gap: 1rem;
  border: 3px solid #ffffff;
  border-radius: 15px;
  font-weight: 700;
  ${(props) =>
    props.type === "successful"
      ? { "background-color": "#3AC23F" }
      : props.type === "failed"
      ? { backgroundColor: "#F50606" }
      : { backgroundColor: "#C2993A" }}
  h3 {
    font-size: 40px;
    margin: 0;
  }
  h4 {
    font-size: 24px;
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    width: 18rem;
    height: 9rem;
    h3 {
      font-size: 32px;
    }
    h4 {
      font-size: 18px;
    }
  }
`;

export { CardWrapper };
