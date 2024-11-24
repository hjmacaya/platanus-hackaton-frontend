import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import favicon from "@/public/favicon.ico";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MeayudaAI",
  description: "Tú enseña, nosotros corregimos 😉",
};

// HERE WE CAN ADD GLOBAL COMPONENTS, FOR EXAMPLE A NAVBAR


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={favicon.src} />
      </head>
      <body className={inter.className + " pt-28"}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
