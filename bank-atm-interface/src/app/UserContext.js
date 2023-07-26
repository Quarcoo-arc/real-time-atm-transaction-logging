import useSessionStorage from "@/hooks/useSessionStorage";

const { createContext } = require("react");

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useSessionStorage("token", "");
  const [user, setUser] = useSessionStorage("user", {});
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
      return { success: false };
    }
  };

  const currencyFormatter = (amount) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GHS",
    });
    return formatter.format(+amount);
  };
  return (
    <UserContext.Provider
      value={{
        loginUserHandler,
        authToken,
        postDataHandler,
        user,
        currencyFormatter,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
