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
import { io } from "socket.io-client";

function App() {
  const socket = io(import.meta.env.VITE_BACKEND_BASE_URL, {
    auth: {
      token: "json-web-token",
    },
    transports: ["websocket"],
  });
  socket.on("connect", function () {
    console.log("Made socket connection", socket.id);
  });
  socket.on("transaction", (msg) => console.log(msg));
  socket.on("disconnect", function () {
    console.log("disconnect");
  });
  socket.on("connect_error", function (err) {
    console.log("connection errror", err);
  });
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
