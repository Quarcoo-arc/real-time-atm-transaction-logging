import { BackgroundWrapper } from "./Background.styled";
import backgroundImg from "../../assets/background.png";

const Background = () => {
  return (
    <BackgroundWrapper>
      <img src={backgroundImg} alt="" />
    </BackgroundWrapper>
  );
};

export default Background;
