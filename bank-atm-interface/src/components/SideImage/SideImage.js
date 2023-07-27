import React from "react";
import { ImageEl } from "./SideImage.styled";

const SideImage = ({ src, alt }) => {
  return <ImageEl alt={alt} src={src} priority={true} />;
};

export default SideImage;
