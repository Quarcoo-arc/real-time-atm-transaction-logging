"use client";
import styled from "@emotion/styled";
import Link from "next/link";

const BackLink = styled(Link)`
  p {
    font-weight: 700;
  }
  color: #c2993a;
  display: flex;
  align-items: center;
  :hover {
    color: var(--blue);
  }
`;

const RetryLink = styled.button`
  p {
    font-weight: 700;
    font-size: 1rem;
  }
  border: none;
  background: none;
  color: var(--blue);
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    color: var(--gold);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

export { BackLink, RetryLink, ButtonWrapper };
