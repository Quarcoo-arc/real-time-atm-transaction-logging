"use client";

import Cookies from "js-cookie";

const { createContext, useState, useEffect } = require("react");

const CookiesContext = createContext();

export const CookiesContextProvider = ({ children }) => {
  const [cookies, setCookies] = useState({});

  const setAllCookies = () =>
    cookies &&
    Object.keys(cookies).forEach((cookie) =>
      Cookies.set(cookie, cookies[cookie])
    );

  useEffect(() => {
    setAllCookies();
  }, [JSON.stringify(cookies)]);

  return (
    <CookiesContext.Provider value={{ cookies, setCookies, setAllCookies }}>
      {children}
    </CookiesContext.Provider>
  );
};

export default CookiesContext;
