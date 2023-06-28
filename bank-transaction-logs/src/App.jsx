import {
  Logo,
  Background,
  Heading,
  CardsList,
  SearchBar,
  Table,
  StaffOnDuty,
} from "./components";
import { StaffBtnAndSearchWrapper } from "./App.styled";

function App() {
  return (
    <>
      <Background />
      <Logo />
      <Heading />
      <CardsList />
      <StaffBtnAndSearchWrapper>
        <StaffOnDuty />
        <SearchBar />
      </StaffBtnAndSearchWrapper>
      <Table />
    </>
  );
}

export default App;
