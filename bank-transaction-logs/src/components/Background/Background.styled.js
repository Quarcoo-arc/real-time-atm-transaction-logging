import styled from "styled-components";

const BackgroundWrapper = styled.div`
  display: flex;
  z-index: -1;
  position: absolute;
  justify-content: center;
  place-items: center;
  height: 100%;
  width: 100%;
  img {
    width: 80%;
    opacity: 0.6;
  }
`;

export { BackgroundWrapper };
