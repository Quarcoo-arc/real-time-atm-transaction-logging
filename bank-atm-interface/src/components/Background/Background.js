import React from "react";
import { BackgroundWrapper } from "./Background.styled";
import backgroundImg from "../../../public/globe.png";
import Image from "next/image";

const Background = () => {
  return (
    <BackgroundWrapper>
      <Image src={backgroundImg} alt="" priority={true} />
    </BackgroundWrapper>
  );
};

export default Background;
