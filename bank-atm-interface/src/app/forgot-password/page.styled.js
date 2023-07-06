"use client";
import styled from "@emotion/styled";
import Link from "next/link";

const BackLink = styled(Link)`
  font-weight: 700;
  color: #c2993a;
  display: flex;
  align-items: center;
  :hover {
    color: var(--blue);
  }
`;

export { BackLink };
