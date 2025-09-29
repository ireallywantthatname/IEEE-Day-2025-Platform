import type { Metadata } from "next";
import {Fira_Code} from "next/font/google";
import "./globals.css";

const fira_code = Fira_Code({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IEEE Day Platform - 2025",
  description: "NSBM Green University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fira_code.className} antialiased select-none bg-black text-white text-base 2xl:text-xl`}
      >
        {children}
      </body>
    </html>
  );
}
