import useSessionStorage from "@/hooks/useSessionStorage";
import { usePathname, useRouter } from "next/navigation";
import { useIdleTimer } from "react-idle-timer";

const { createContext, useState, useContext, useEffect } = require("react");

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useSessionStorage("token", "");
  const [user, setUser] = useSessionStorage("user", {});
  const [sessionTimeout, setSessionTimeout] = useState(false);
  const [lastActivity, setLastActivity] = useSessionStorage(
    "lastActivity",
    null
  );
  const [redirectUrl, setRedirectUrl] = useState("");
  const [pin, setPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [oldPin, setOldPin] = useState("");
  const [withdrawalInfo, setWithdrawalInfo] = useState({});
  const [depositInfo, setDepositInfo] = useState({});
  const [remainingTime, setRemainingTime] = useState(0);
  const [openTimeoutDialogue, setOpenTimeoutDialogue] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const postDataHandler = async (url, payload) => {
    const result = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    return await result.json();
  };

  const getDataHandler = async (url) => {
    const result = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    return await result.json();
  };

  const loginUserHandler = async (payload) => {
    const result = await postDataHandler(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/login`,
      payload
    );
    if (result.success) {
      setAuthToken(result.token);
      setUser(result.data);
      return { success: true };
    } else {
      return result;
    }
  };
  const registerUserHandler = async (payload) => {
    const result = await postDataHandler(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/signup`,
      payload
    );
    if (result.success) {
      setAuthToken(result.token);
      setUser(result.data);
      return { success: true };
    } else {
      return result;
    }
  };

  const currencyFormatter = (amount) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GHS",
    });
    return formatter.format(+amount);
  };

  const verifyPIN = async () => {
    if (!pin) return false;
    const result = await postDataHandler(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/verify-pin`,
      {
        pin: pin,
      }
    );
    return result.success;
  };

  const checkPINEntry = async () => {
    if (!(await verifyPIN())) {
      setRedirectUrl(pathname);
      router.push("/atm/auth");
    }
  };

  const logoutHandler = () => {
    setAuthToken("");
    setLastActivity(null);
    setUser({});
    router.push("/login");
  };

  const checkAuth = async () => {
    try {
      const result = await getDataHandler(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/verify-token`
      );
      if (!user || !user.name || !result.success) {
        logoutHandler();
      }
    } catch (error) {
      router.push("/login");
    }
  };

  const handleUserActivity = () => {
    setLastActivity(new Date());
  };

  useEffect(() => {
    if (authToken) {
      window.addEventListener("click", handleUserActivity);
      window.addEventListener("keydown", handleUserActivity);
    }

    return () => {
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, []);

  useEffect(() => {
    let timerId = "";
    if (authToken) {
      const inactivityTimeout = 5 * 60 * 1000; // 5 minutes in milliseconds

      const handleInactivity = () => {
        const currentTime = new Date();
        const timeElapsed = currentTime - lastActivity;

        if (timeElapsed >= inactivityTimeout) {
          setSessionTimeout(true);
          logoutHandler();
        }
      };

      timerId = setInterval(handleInactivity, inactivityTimeout);
    }

    return () => {
      timerId && clearInterval(timerId);
    };
  }, []);

  const onAction = (event, idleTimer) => {
    if (idleTimer.isPrompted()) {
      idleTimer.activate();
    }
  };

  const onActive = (event, idleTimer) => {
    if (idleTimer.isPrompted()) {
      setOpenTimeoutDialogue(false);
    }
  };

  const onPrompt = () => {
    setOpenTimeoutDialogue(true);
  };

  const onIdle = () => {
    setOpenTimeoutDialogue(false);
    logoutHandler();
  };

  const promptBeforeIdle = 1000 * 40;

  const { getRemainingTime, activate } = useIdleTimer({
    disabled: !authToken,
    timeout: 1000 * 60 * 4,
    promptBeforeIdle,
    onAction,
    onActive,
    onPrompt,
    onIdle,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  const extendSession = () => activate();

  const timeTillPrompt = Math.max(remainingTime - promptBeforeIdle / 1000, 0);

  return (
    <UserContext.Provider
      value={{
        loginUserHandler,
        authToken,
        postDataHandler,
        user,
        currencyFormatter,
        pin,
        setPin,
        checkAuth,
        logoutHandler,
        redirectUrl,
        setRedirectUrl,
        verifyPIN,
        registerUserHandler,
        checkPINEntry,
        newPin,
        setNewPin,
        oldPin,
        setOldPin,
        withdrawalInfo,
        setWithdrawalInfo,
        depositInfo,
        setDepositInfo,
        sessionTimeout,
        setSessionTimeout,
        extendSession,
        timeTillPrompt,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
