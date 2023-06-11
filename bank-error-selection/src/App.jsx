import { Background } from "./App.styled";
import { Logo, Heading } from "./components";
import backgroundImg from "./assets/background.png";

function App() {
  return (
    <>
      <Background>
        <img src={backgroundImg} alt="" />
      </Background>
      <Logo />
      <Heading />
    </>
  );
}

export default App;
