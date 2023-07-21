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
import { LogsContextProvider } from "./contexts/LogsContext";

function App() {
  return (
    <LogsContextProvider>
      <Background />
      <Logo />
      <Heading />
      <CardsList />
      <StaffBtnAndSearchWrapper>
        <StaffOnDuty />
        <SearchBar />
      </StaffBtnAndSearchWrapper>
      <Table />
    </LogsContextProvider>
  );
}

export default App;
