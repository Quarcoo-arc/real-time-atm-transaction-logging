import { createContext, useState } from "react";
import { io } from "socket.io-client";

const LogsContext = createContext();

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const LogsContextProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const loadLogs = async () => {
    try {
    } catch (error) {}
  };

  const filterLogs = async () => {
    try {
    } catch (error) {}
  };

  const socket = io(BASE_URL, {
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
    <LogsContext.Provider
      value={{
        logs,
        setLogs,
        filterLogs,
        loadLogs,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
};

export default LogsContext;
