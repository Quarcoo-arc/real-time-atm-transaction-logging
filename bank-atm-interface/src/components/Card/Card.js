"use client";
import React from "react";
import { CardContainer, CardDescription } from "./Card.styled";

const Card = ({ img, description, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      {img}
      <CardDescription>{description}</CardDescription>
    </CardContainer>
  );
};

export default Card;
