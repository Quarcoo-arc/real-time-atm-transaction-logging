import React from "react";
import { MainHeading, SubHeading } from "./Heading.styled";

const Heading = ({ type = "main", children, alignment }) => {
  return type === "main" ? (
    <MainHeading alignment={alignment}>{children}</MainHeading>
  ) : (
    <SubHeading alignment={alignment}>{children}</SubHeading>
  );
};

export default Heading;
