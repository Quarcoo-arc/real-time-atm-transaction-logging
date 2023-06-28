import "./globals.css";
import { Poppins, Dancing_Script } from "next/font/google";
import { Logo } from "@/components";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
        <Logo />
        {children}
      </body>
    </html>
  );
}
