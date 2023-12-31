import useSessionStorage from "@/hooks/useSessionStorage";
import { usePathname, useRouter } from "next/navigation";

const { createContext, useState, useContext, useEffect } = require("react");

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useSessionStorage("token", "");
  const [user, setUser] = useSessionStorage("user", {});
  const [redirectUrl, setRedirectUrl] = useState("");
  const [pin, setPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [oldPin, setOldPin] = useState("");
  const [withdrawalInfo, setWithdrawalInfo] = useState({});
  const [depositInfo, setDepositInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      setRedirectUrl(pathname);
      router.push("/atm/auth");
    }
  };

  const logoutHandler = () => {
    setIsLoading(true);
    setAuthToken("");
    setUser({});
    router.push("/login");
  };

  const checkAuth = async () => {
    try {
      setIsLoading(true);
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
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
