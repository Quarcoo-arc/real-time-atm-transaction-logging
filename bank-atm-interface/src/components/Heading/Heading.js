import React from "react";
import { MainHeading, SubHeading } from "./Heading.styled";

const Heading = ({ type = "main", children }) => {
  return type === "main" ? (
    <MainHeading>{children}</MainHeading>
  ) : (
    <SubHeading>{children}</SubHeading>
  );
};

export default Heading;
