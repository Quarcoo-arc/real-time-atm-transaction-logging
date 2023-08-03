"use client";
import "./globals.css";
import { Poppins, Dancing_Script } from "next/font/google";
import { Logo } from "@/components";
import { UserContextProvider } from "./UserContext";
import React from "react";

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
        <UserContextProvider>
          <Logo />
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
