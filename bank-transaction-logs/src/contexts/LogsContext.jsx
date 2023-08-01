import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const LogsContext = createContext();

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const LogsContextProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [newLogs, setNewLogs] = useState([]);
  const [staffInfo, setStaffInfo] = useState({ name: "", email: "" });

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
        headers: {
          "Content-Type": "Application/json",
        },
        method: "POST",
        body: JSON.stringify({
          searchString,
        }),
      });
      const data = await result.json();
      setLogs(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStaffInfo = async () => {
    const result = await fetch(`${BASE_URL}/active-staff`);
    const data = await result.json();
    if (data.success) {
      const { name, email } = data.data;
      setStaffInfo({ name, email });
    }
  };

  const changeStaffInfo = async (name, email) => {
    const result = await fetch(`${BASE_URL}/active-staff`, {
      headers: {
        "Content-Type": "Application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name,
        email,
      }),
    });
    const data = await result.json();
    if (data.success) {
      const { name, email } = data.data;
      setStaffInfo({ name, email });
    }
  };

  useEffect(() => {
    const func = async () => await filterLogs();
    func();
  }, [searchString]);

  useEffect(() => {
    const func = async () => await loadLogs();
    func();
  }, []);

  useEffect(() => {
    const func = async () => await fetchStaffInfo();
    func();
  }, []);

  useEffect(() => {
    if (!searchString && newLogs) {
      setLogs((prev) => [...newLogs, ...prev]);
      setNewLogs([]);
    }
  }, [JSON.stringify(newLogs), searchString]);

  useEffect(() => {
    const socket = io(BASE_URL, {
      auth: {
        token: "json-web-token",
      },
      transports: ["websocket"],
    });
    socket.on("connect", function () {
      console.log("Made socket connection", socket.id);
    });
    socket.on("transaction", (msg) => {
      console.log(msg);
      !logs || (logs[0] && msg.transactionId !== logs[0].meta.transactionId)
        ? setNewLogs((prev) => [{ meta: msg }, ...prev])
        : null;
    });
    socket.on("disconnect", function () {
      console.log("disconnect");
    });
    socket.on("connect_error", function (err) {
      console.log("connection errror", err);
    });
  }, []);

  return (
    <LogsContext.Provider
      value={{
        logs,
        setLogs,
        filterLogs,
        loadLogs,
        searchString,
        setSearchString,
        changeStaffInfo,
        staffInfo,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
};

export const useLogs = () => useContext(LogsContext);

export default LogsContext;
