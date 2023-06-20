import styled, { css } from "styled-components";

const Status = styled.p`
  margin: 0;
  font-weight: 600;
  ${(props) =>
    props.type === "success"
      ? css`
          color: #3ac23f;
        `
      : props.type === "user-error"
      ? css`
          color: #c2993a;
        `
      : css`
          color: #f50606;
        `}
`;

const DateAndTime = styled.div`
  margin: 0;
  ${(props) =>
    props.time &&
    css`
      color: rgba(0, 0, 0, 0.6);
    `}
`;

export { Status, DateAndTime };
