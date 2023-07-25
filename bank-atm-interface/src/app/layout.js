"use client";
import "./globals.css";
import { Poppins, Dancing_Script } from "next/font/google";
import { Logo } from "@/components";
import { CookiesContextProvider } from "./CookiesContext";
import store from "./store";
import { Provider } from "react-redux";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dancing_script = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
});

export const metadata = {
  title: "Bank ATM",
  description: "Banking you can trust!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${dancing_script.variable}`}
        suppressHydrationWarning={true}
      >
        <Provider store={store}>
          <CookiesContextProvider>
            <Logo />
            {children}
          </CookiesContextProvider>
        </Provider>
      </body>
    </html>
  );
}
