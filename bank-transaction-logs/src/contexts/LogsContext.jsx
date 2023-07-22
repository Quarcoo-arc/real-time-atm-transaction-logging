import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const LogsContext = createContext();

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const LogsContextProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [searchString, setSearchString] = useState("");

  const loadLogs = async () => {
    try {
      const result = await fetch(`${BASE_URL}/logs`);
      const data = await result.json();
      setLogs(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterLogs = async () => {
    try {
      const result = await fetch(`${BASE_URL}/logs/filter`, {
        method: "POST",
        body: JSON.stringify({
          searchString,
        }),
      });
      const data = await result.json();
      setLogs(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const func = async () =>
      searchString ? await filterLogs() : await loadLogs();
    func();
  }, [searchString]);

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
        searchString,
        setSearchString,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
};

export default LogsContext;
