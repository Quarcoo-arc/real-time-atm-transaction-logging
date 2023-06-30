"use client";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  a {
    align-self: flex-end;
    font-weight: 600;
    :hover {
      color: var(--gold-tint);
    }
  }
`;

export { Wrapper };
